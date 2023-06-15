const Joi = require("joi");
const { password } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().trim(),
    email: Joi.string().trim().required().email(),
    password: Joi.custom(password).required(),
  }),
};

const validateEmail = {
  body: Joi.object().keys({
    digit: Joi.string().min(6).max(6).trim().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    usernameOrEmail: Joi.string().trim().required(),
    password: Joi.custom(password).required(),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.custom(password).required(),
    newPassword: Joi.custom(password).required(),
  }),
};

const changeEmail = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
  }),
};

const updateEmail = {
  body: Joi.object().keys({
    digit: Joi.string().min(6).max(6).trim().required(),
  }),
};

const getUserByUsername = {
  param: Joi.object().keys({
    username: Joi.string().trim().required(),
  }),
};

const deleteUser = {
  param: Joi.object().keys({
    password: Joi.custom(password).required(),
  }),
};

module.exports = {
  changeEmail,
  createUser,
  deleteUser,
  getUserByUsername,
  login,
  updateEmail,
  updatePassword,
  validateEmail,
};
