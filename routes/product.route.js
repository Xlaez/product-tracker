const express = require("express");
const Dolph = require("@dolphjs/core");
const productValidation = require("../validations/product.validation");
const { authroizeUser } = require("../middlewares/authroize.middleware");
const validate = require("../utils/validator.utils");
const {
  newProduct,
  editProduct,
  getProduct,
  getProducts,
  deleteProduct,
} = require("../controller/product.contoller");

const router = express.Router();

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
  authroizeUser,
  validate(productValidation.getProducts),
  getProducts
);
router.delete(
  "/api/products/:prodId",
  authroizeUser,
  validate(productValidation.deleteProduct),
  deleteProduct
);

module.exports = router;
