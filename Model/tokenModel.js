const mongoose = require("mongoose");
const AuthModel = require("./authModel")

const TokenSchema = new mongoose.Schema({
      _userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "auth_details"
            
      },
      token: {
            type: String,
            required: true
      }
})


 const TokenModel= new mongoose.model("token_details", TokenSchema)
 module.exports = TokenModel