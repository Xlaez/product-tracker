const { catchAsync, AppRes, httpStatus } = require("@dolphjs/core");
const User = require("../models/users.model");

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId)
    .select(["-password", "-updatedAt", "-__v"])
    .lean();
  if (!user) throw new AppRes(httpStatus.NOT_FOUND, "user not found");
  res.status(httpStatus.OK).json({ data: user });
});

const getUserByUsername = catchAsync(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username })
    .select(["-password", "-updatedAt", "-__v"])
    .lean();
  if (!user) throw new AppRes(httpStatus.NOT_FOUND, "user not found");
  res.status(httpStatus.OK).json({ data: user });
});

const deleteUser = catchAsync(async (req, res) => {
  const { password } = req.params;
  const user = await User.findById(req.userId);
  if (!user) throw new AppRes(httpStatus, "user not found");
  if (!(await user.doesPasswordMatch(password)))
    throw new AppRes(httpStatus.BAD_REQUEST, "password does not match");
  user.remove();
  res.status(httpStatus.OK).json({ message: "account deleted" });
});

module.exports = { getUserById, getUserByUsername, deleteUser };
