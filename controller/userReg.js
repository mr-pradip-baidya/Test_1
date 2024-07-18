const UserModel = require("../Model/userRegModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const TokenModel = require("../Model/tokenModel");
// const AuthModel = require("../Model/authModel");
// console.log("Auth model", AuthModel)


// Node mailer
const transporter = nodemailer.createTransport({
  host: "smtp",
  port: 465,
  secure: false,
  requireTLS: true,
  service: "gmail",
  auth: {
    user: "biltubaidya8888@gmail.com",
    pass: "nllb hyzb gsil mhyh",
  },
});

// **************Home Page*****************
const getForm = (req, res) => {
  res.render("user/home", {
    title: "User Registration",
  });
};

//*****************Registration Page************************
const postForm = async (req, res) => {
  try {
    // console.log("Data getting from body",req.body)
    const { email, password } = req.body;
    const mail = email.toLowerCase();
    //     console.log("mail", mail);
    if (email === mail) {
      if (email) {
        let hashPassword = await bcrypt.hash(password.toLowerCase(), 12);
      //   console.log("hashPassword", hashPassword);
        const userData = new UserModel({
          mail,
          hashPassword,
        });
        // Data saved
        const saveUser = await userData.save();
      //   console.log("Data saved in database", saved);

      if (saveUser) {
        console.log("User Registation data send to database");
        const token = jwt.sign(
          {
            mail: req.body.email
          },
          "secretkey12345566789@serectkey876549876",
          {
            expiresIn: "1h"
          }
        );
        console.log("Token", token)

        const token_data = new TokenModel({
          token: token,
          _userId: saveUser._id,
        });

        const savedToken = await token_data.save();
        console.log("Token Saved", savedToken)

        // After token saved
        if (savedToken) {
          let mailOptions = {
            from: "biltubaidya8888@gmail.com",
            to: req.body.email,
            // to: "biltubaidya8888@gmail.com",
            subject: "Email verification",
            text:
              "Hello" +
              "\n\nYou have successfully submitted your data to be registered. Please verify your account by clicking the link: \n" +
              "http://" +
              req.headers.host +
              "/mail_confirmation/" +
              req.body.email +
              "/" +
              token +
              "\n\nThank You!\n\n",
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error to send mail:", error);
              res.redirect("/");
            } else {
              console.log("Email sent:", info.response);
              res.redirect("/");
            }
          });
          // res.redirect("/login");
        } else {
          console.log("Bcrypt Failed");
        }
    } else {
      console.log("Please enter email to lower case");
    }
  }
  
}
}catch (err) {
    console.log("Data is not saved in database", err);
  }
};


//************Mail Confirmation****************
const mail_confirmation = async (req, res) => {
  try {
    console.log(
      "Received mail from confirmation mail",
      req.params.email,
      req.params.token
    );

    let user_data = await UserModel.findOne({ mail: req.params.email });
    console.log(
      "Data of user whose mail verification is conducting",
      user_data
    );

    if (user_data.isVerified) {
      console.log("User already verified.");
      req.flash("msg", "User already verified, go to login");
      res.redirect("/authSignUp");
    } else {
      user_data.isVerified = true;
      let save_res = await user_data.save();
      console.log("Saved new user data:", save_res);
      if (save_res) {
        console.log("Your account successfully verified");
        res.redirect("/login");
      }
    }
  } catch (err) {
    console.log("mail_confirmation:", err);
  }
};



//************Login page****************
const loginForm = async (req, res) => {
  res.render("user/login", {
      title: "Login Page"
  });
};

module.exports = {
  getForm,
  postForm,
  loginForm,
  mail_confirmation,
};
