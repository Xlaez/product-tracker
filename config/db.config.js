const { connect } = require("mongoose");
require("dotenv").config({});

const mongoConfig = {
  url: process.env.MONGOURI || "mongodb://localhost:27017/tracker",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  },
};

const db = async () => {
  return connect(mongoConfig.url, mongoConfig.options);
};

module.exports = { db };
