const Joi = require("joi");

const createProduct = {
  param: Joi.object().keys({
    name: Joi.string().required(),
    sendersInfo: Joi.string().required(),
    receiversAddress: Joi.string().required(),
    country: Joi.string().required(),    
    description: Joi.string().required(),
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
    country: Joi.string(),
    description: Joi.string(),
    name: Joi.string(),
    receiversAddress: Joi.string(),
    sendersInfo: Joi.string(),
  }),
};

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
};
