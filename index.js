const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const { httpStatus } = require("@dolphjs/core");
const { db } = require("./config/db.config");
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");

require("dotenv").config({});

const port = process.env.PORT || 5500;

db()
  .then((result) => console.log("MongoDb Connected on port:", port))
  .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use("/", authRouter);
app.use("/", productRouter);

app.use("/", (req, res) => {
  res
    .status(httpStatus.NOT_FOUND)
    .send("you have requested for a non-existent route");
});

const runServer = () => {
  app.listen(port, () => {
    console.log(`App Running On Port: ${port}`);
  });
};

runServer(port);
