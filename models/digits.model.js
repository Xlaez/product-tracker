const { mongoose } = require("@dolphjs/core");

const DigitSchema = new mongoose.Schema({
  digit: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Digit = mongoose.model("digits", DigitSchema);
module.exports = Digit;
