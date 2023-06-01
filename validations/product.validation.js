const Joi = require("joi");

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    sendersName: Joi.string().required(),
    receiversName: Joi.string().required(),
    deliveryDetails: Joi.string().required(),
    description: Joi.object().keys({
      quantity: Joi.number(),
      color: Joi.string(),
      size: Joi.string(),
      contact: Joi.string(),
      country: Joi.string(),
    }),
  }),
};

const getProduct = {
  query: Joi.object().keys({
    trackingId: Joi.string(),
    referenceNo: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    limit: Joi.string().required(),
    page: Joi.string().required(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    prodId: Joi.string().required(),
  }),
};

const editProduct = {
  body: Joi.object().keys({
    prodId: Joi.string().required(),
    description: Joi.object().keys({
      color: Joi.string(),
      size: Joi.string(),
      quantity: Joi.number(),
      contact: Joi.string(),
      country: Joi.string(),
    }),
    name: Joi.string(),
  }),
};

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
};
