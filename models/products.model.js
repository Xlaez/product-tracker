const { mongoose } = require("@dolphjs/core");
const { newTrackingId, newReferenceNo } = require("../utils/randomGen.utils");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sendersInfo: {
      type: String,
      required: true,
    },
    receiversAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    country: {
      type: String,
      required:true,
    },
    imgurl: {
      type: String,
      // required: true,
    },
    trackingId: {
      type: String,
      required: true,
      index: true,
    },
    referenceNo: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// ProductSchema.pre("save", function (next) {
//   const product = this;
//   if (!product.trackingId.length) {
//     const trackingId = newTrackingId(8);
//     product.trackingId = trackingId;
//   }
//   if (!product.referenceNo.length) {
//     const referenceNo = newReferenceNo(9);
//     product.referenceNo = referenceNo;
//   }
//   next();
// });

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
