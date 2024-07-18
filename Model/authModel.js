const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);


const AuthModel = new mongoose.model("auth_details", AuthSchema);
module.exports = AuthModel;