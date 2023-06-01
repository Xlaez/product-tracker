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

router.post("/api/auth/register", createUser);
router.post("/api/auth/validate", validateEmail);
router.post("/api/auth/login", login);
router.post("/api/auth/update-password", authroizeUser, updatePassword);
router.post("/api/auth/change-email", authroizeUser, requestForEmailChange);
router.post("/api/auth/update-email", authroizeUser, updateEmail);

router.get("/api/user/get-by-id", authroizeUser, getUserById);
router.get("/api/user/:username", authroizeUser, getUserByUsername);
router.delete("/api/user/:password", authroizeUser, deleteUser);

router.post(
  "/api/products",
  authroizeUser,
  Dolph.mediaParser({ fieldname: "upload", type: "single" }),
  newProduct
);
router.patch("/api/products", authroizeUser, editProduct);
router.get("/api/products", authroizeUser, getProduct);
router.get("/api/products/all", authroizeUser, getProducts);
router.delete("/api/products/:prodId", authroizeUser, deleteProduct);

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
