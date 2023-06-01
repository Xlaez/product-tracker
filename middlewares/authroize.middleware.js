const { catchAsync, AppRes, httpStatus } = require("@dolphjs/core");
const { verify } = require("jsonwebtoken");
const User = require("../models/users.model");
require("dotenv").config({});

const authroizeUser = catchAsync(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return next(
      new AppRes(httpStatus.UNAUTHORIZED, "provide a valid authorization token")
    );
  if (typeof token !== "string") {
    return next(
      new AppRes(httpStatus.UNAUTHORIZED, "provide a valid token type")
    );
  }

  try {
    const payload = verify(token, process.env.SECRET_KEY);
    const user = await User.findById(payload.userId).lean();
    if (!user) next(new AppRes(httpStatus.UNAUTHORIZED, "user does not exist"));
    req.userId = user._id;
    req.email = user.email;
    next();
  } catch (e) {
    next(new AppRes(httpStatus.SERVICE_UNAVAILABLE, e.message));
  }
});

module.exports = { authroizeUser };
