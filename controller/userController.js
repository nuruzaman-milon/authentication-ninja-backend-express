const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../util/secretEnvData");

module.exports.getUserData = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.find();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
};
module.exports.signUpUser = async (req, res) => {
  try {
    // console.log(req.body);
    //check is user exist
    const isUserExist = await User.exists({ email: req.body.email });
    if (isUserExist) {
      return res.status(409).json({
        success: true,
        message: "User Already Exist.",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (hashedPassword) {
      //   const user = User({
      //     fullName: req.body.fullName,
      //     gender: req.body.gender,
      //     email: req.body.email,
      //     password: hashedPassword,
      //     phone: req.body.phone,
      //     imageUrl: req.body.imageUrl,
      //   });
      //   await user.save();
      req.body.password = hashedPassword;
      await User(req.body).save();
    }
    res.status(200).json({
      success: true,
      message: "User signed up successfully",
      data: req.body,
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err,
    });
  }
};
module.exports.signInUser = async (req, res) => {
  try {
    const existUserInfo = await User.findOne({ email: req.body.email });
    console.log(existUserInfo);
    if (existUserInfo) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        existUserInfo.password
      );
      if (isValidPassword) {
        //generate token
        const jwtData = {
          _id: existUserInfo._id,
          userName: existUserInfo.fullName,
          email: existUserInfo.email,
        };
        const token = jwt.sign(jwtData, jwtSecret, { expiresIn: "1h" });

        //send response to client
        res.status(200).json({
          success: true,
          accessToken: token,
          message: "User signed in successfully",
          data: existUserInfo,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found. Please Sign Up first",
      });
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      message: err.message,
    });
  }
};
