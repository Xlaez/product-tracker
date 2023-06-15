const express = require("express");
const userValidation = require("../validations/user.validation");
const { authroizeUser } = require("../middlewares/authroize.middleware");
const validate = require("../utils/validator.utils");
const {
  createUser,
  validateEmail,
  updatePassword,
  requestForEmailChange,
  updateEmail,
  login,
} = require("../controller/auth.controller");
const {
  getUserByUsername,
  getUserById,
  deleteUser,
} = require("../controller/user.controller");

const router = express.Router();

router.post(
  "/api/auth/register",
  validate(userValidation.createUser),
  createUser
);
router.post(
  "/api/auth/validate",
  validate(userValidation.validateEmail),
  validateEmail
);
router.post("/api/auth/login", validate(userValidation.login), login);
router.post(
  "/api/auth/update-password",
  authroizeUser,
  validate(userValidation.updatePassword),
  updatePassword
);
router.post(
  "/api/auth/change-email",
  authroizeUser,
  validate(userValidation.changeEmail),
  requestForEmailChange
);
router.post(
  "/api/auth/update-email",
  authroizeUser,
  validate(userValidation.updateEmail),
  updateEmail
);

router.get("/api/user/get-by-id", authroizeUser, getUserById);
router.get(
  "/api/user/:username",
  authroizeUser,
  validate(userValidation.getUserByUsername),
  getUserByUsername
);
router.delete(
  "/api/user/:password",
  authroizeUser,
  validate(userValidation.deleteUser),
  deleteUser
);

module.exports = router;
