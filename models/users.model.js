const { mongoose } = require("@dolphjs/core");
const { compare } = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [7, "password cannot be less than 7 characters"],
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.doesPasswordMatch = async function (password) {
  const user = this;
  return compare(password, user.password);
};

const User = mongoose.model("users", UserSchema);
module.exports = User;
