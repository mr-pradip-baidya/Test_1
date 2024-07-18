const mongoose = require("mongoose");
// const { stringify } = require("querystring");
mongoose.pluralize(null)
const userSchema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserData = mongoose.model('userdata', userSchema);
module.exports = UserData;
