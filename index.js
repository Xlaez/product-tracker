const Dolph = require("@dolphjs/core");
const helmet = require("helmet");
const cors = require("cors");

const {
  newProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getProducts,
} = require("./controller/product.contoller");
const {
  createUser,
  validateEmail,
  login,
  updatePassword,
  requestForEmailChange,
  updateEmail,
} = require("./controller/auth.controller");
const { authroizeUser } = require("./middlewares/authroize.middleware");
const {
  getUserById,
  getUserByUsername,
  deleteUser,
} = require("./controller/user.controller");

const validate = require("./utils/validator.utils");
const userValidation = require("./validations/user.validation");
const productValidation = require("./validations/product.validation");

require("dotenv").config({});

const mongoConfig = {
  url: process.env.MONGOURI || "mongodb://localhost:27017/tracker",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  },
};

const router = Dolph.Router();

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

router.post(
  "/api/products",
  authroizeUser,
  validate(productValidation.createProduct),
  Dolph.mediaParser({ fieldname: "upload", type: "single" }),
  newProduct
);
router.patch(
  "/api/products",
  authroizeUser,
  validate(productValidation.editProduct),
  editProduct
);
router.get("/api/products", validate(productValidation.getProduct), getProduct);
router.get(
  "/api/products/all",
  // authroizeUser,
  validate(productValidation.getProducts),
  getProducts
);
router.delete(
  "/api/products/:prodId",
  authroizeUser,
  validate(productValidation.deleteProduct),
  deleteProduct
);

router.use("/", (req, res) => {
  res
    .status(Dolph.httpStatus.NOT_FOUND)
    .send("you have requested for a non-existent route");
});

const routes = [
  {
    path: "/",
    router,
  },
];

const dolph = new Dolph(routes, 5500, "development", mongoConfig, [
  helmet(),
  cors({ origin: "*", credentials: true }),
]);
dolph.listen();
