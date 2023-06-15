const { AppRes, catchAsync, httpStatus } = require("@dolphjs/core");
const User = require("../models/users.model");
const { hashSync } = require("bcryptjs");
const { uniqueFiveDigits } = require("../utils/randomGen.utils");
const Digit = require("../models/digits.model");
const { sign } = require("jsonwebtoken");
const sendMail = require("../utils/emailsender.utils");
require("dotenv").config({});

const generateJsonToken = async (userId) => {
  return sign({ userId }, process.env.SECRET_KEY, {});
};

const createUser = catchAsync(async (req, res) => {
  const { body } = req;
  await User.create({
    email: body.email,
    password: hashSync(body.password, 11),
    isValid: true,
  });
  // const digit = uniqueFiveDigits();
  // await Digit.create({ digit, email: body.email });
  // SEND EMAIL TO USER EMAIL FOR VERIFICATION
  // await sendMail(body.email, digit, "Verify Your Email");
  await sendMail(body.email, "", "Account Created");
  res.status(httpStatus.CREATED).json({ message: "success" });
});

const validateEmail = catchAsync(async (req, res) => {
  const { digit } = req.body;
  const getEmail = await Digit.findOne({
    digit,
  });
  if (!getEmail || new Date().getHours() > getEmail.createdAt.getHours() + 1)
    throw new AppRes(
      httpStatus.BAD_REQUEST,
      "either 6 digits code is wrong or it has expired"
    );
  await User.updateOne({ email: getEmail.email }, { isValid: true });
  await getEmail.remove();
  throw new AppRes(httpStatus.OK, "account activated");
});

const login = catchAsync(async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const getUser = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!getUser)
    throw new AppRes(httpStatus.NOT_FOUND, "email or password incorrect");
  if (!(await getUser.doesPasswordMatch(password)))
    throw new AppRes(httpStatus.BAD_REQUEST, "email or password incorrect");
  const token = await generateJsonToken(getUser._id);
  const user = getUser._id;
  res.status(httpStatus.OK).json({ data: { user, token } });
});

const updatePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.userId);
  if (!(await user.doesPasswordMatch(oldPassword)))
    throw new AppRes(httpStatus.BAD_REQUEST, "password is incorrect");
  await User.updateOne(
    { _id: req.userId },
    { password: hashSync(newPassword, 11) }
  );
  throw new AppRes(httpStatus.OK, "updated password");
});

const requestForEmailChange = catchAsync(async (req, res) => {
  const { email } = req.body;
  const digit = uniqueFiveDigits();
  await Digit.create({ email, digit });
  // SEND EMAIL TO USER EMAIL
  await sendMail(email, digit, "Update Email");
  res.status(httpStatus.OK).json({ message: "sent" });
});

const updateEmail = catchAsync(async (req, res) => {
  const { digit } = req.body;
  const emailObj = await Digit.findOne({ digit }).lean();
  if (!emailObj)
    throw new AppRes(
      httpStatus.BAD_REQUEST,
      "either digits has expired or is wrong"
    );
  if (new Date().getHours() > emailObj.createdAt.getHours() + 3)
    throw new AppRes(
      httpStatus.BAD_REQUEST,
      "either digits has expired or is wrong"
    );
  await User.updateOne({ _id: req.userId }, { email: emailObj.email });
  res.status(httpStatus.OK).json({ data: "updated" });
});

module.exports = {
  createUser,
  validateEmail,
  login,
  updatePassword,
  requestForEmailChange,
  updateEmail,
};
