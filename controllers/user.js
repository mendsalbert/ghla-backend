const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { nanoid } = require("nanoid");
//controller to register a user

exports.registerUserController = async (req, res) => {
  try {
    const {
      firstname,
      secondname,
      firstguardian,
      firstguardiancontact,
      secondguardian,
      secondguardiancontact,
      nameofschool,
      classname,
      gpsaddress,
      housenumber,
      password,
      contact,
      email,
      ghanacard,
      usertype,
      username,
    } = req.body;
    console.log(req.body);
    let user = await User.findOne({ username });
    if (user) {
      res
        .status(400)
        .json({ msg: " A user already exist with this particular username" });
    }

    user = new User({
      firstname,
      secondname,
      firstguardian,
      firstguardiancontact,
      secondguardian,
      secondguardiancontact,
      nameofschool,
      classname,
      gpsaddress,
      housenumber,
      password,
      contact,
      email,
      ghanacard,
      usertype,
      username,
    });

    let salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    const savedUser = await user.save();

    const payLoad = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payLoad,
      config.get("jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    res.status(200).json({ user: savedUser });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email do not exist" });
    }

    const forgetPasswordToken = nanoid(48);
    //send an email with the token
    //save the token inside the database;
    let updateUserToken = await User.findOneAndUpdate(
      { email },
      { token: forgetPasswordToken }
    );
    res.json({
      user: updateUserToken,
      msg: `an email has been send to ${email}, check you inbox and reset your password`,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getAllUsersController = async (req, res) => {
  try {
    let allusers = await User.find({});
    res.json(allusers);
  } catch (error) {
    res.json(error);
  }
};

exports.getAllAdultsController = async (req, res) => {
  try {
    let allusers = await User.find({ usertype: "adult" });
    res.json(allusers);
  } catch (error) {
    res.json(error);
  }
};

exports.getAllChildrenController = async (req, res) => {
  try {
    let allusers = await User.find({ usertype: "children" });
    res.json(allusers);
  } catch (error) {
    res.json(error);
  }
};
