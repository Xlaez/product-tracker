const { catchAsync, httpStatus, AppRes } = require("@dolphjs/core");
const { uploadSingle } = require("../utils/cloudinary.utils");
const Product = require("../models/products.model");
const { newTrackingId, newReferenceNo } = require("../utils/randomGen.utils");

const newProduct = catchAsync(async (req, res) => {
  const { body, file } = req;
  let insertObj = { ...body };
  if (file) {
    const { url } = await uploadSingle(file.path);
    insertObj.imgurl = url;
  }
  insertObj.trackingId = newTrackingId(8);
  insertObj.referenceNo = newReferenceNo(9);
  const prod = await Product.create(insertObj);
  res.status(httpStatus.CREATED).json({ data: prod });
});

const getProduct = catchAsync(async (req, res) => {
  const { trackingId, referenceNo } = req.query;
  const product = await Product.findOne({
    $or: [{ trackingId }, { referenceNo: trackingId }],
  }).lean();
  if (!product) throw new AppRes(httpStatus.NOT_FOUND, "resource not found");
  res.status(httpStatus.OK).json({ data: product });
});

const getProducts = catchAsync(async (req, res) => {
  // const { limit, page } = req.query;
  // const skip = (+page - 1) * +limit;

  const products = await Product.find({})
    // .limit(limit)
    // .skip(skip)
    .select(["-__v"]);
  if (!products) throw new AppRes(httpStatus.NOT_FOUND, "resources not found");
  // const totalProducts = await Product.find({}).countDocuments();
  res.status(httpStatus.OK).json(products);
});

const editProduct = catchAsync(async (req, res) => {
  const { body } = req;
  const product = await Product.findOneAndUpdate(
    { _id: body.prodId },
    { ...body },
    { new: true }
  );
  if (!product)
    throw new AppRes(httpStatus.BAD_REQUEST, "cannot edit resource");
  res.status(httpStatus.OK).json({ data: product });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { prodId } = req.params;
  const prod = await Product.findByIdAndDelete(prodId, {
    returnDocument: true,
  });
  if (!prod)
    throw new AppRes(
      httpStatus.INTERNAL_SERVER_ERROR,
      "resource could not be deleted"
    );
  throw new AppRes(httpStatus.OK, "resource deleted");
});

module.exports = {
  newProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getProducts,
};
