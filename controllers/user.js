const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { nanoid } = require("nanoid");
const fs = require("fs");
const formidable = require("formidable");

exports.registerUserController = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }

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
      } = fields;

      const saveUser = async () => {
        if (files.image.size > 2000000) {
          return res.json({ msg: "Please select file sizes less than 4MB" });
        }
        var image = fs.readFileSync(files.image.path);
        var encImage = new Buffer(image).toString("base64");

        let user = await User.findOne({ username });
        if (user) {
          res.status(400).json({
            msg: " A user already exist with this particular username",
          });
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
          image: encImage,
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
      };

      if (typeof files.image === "object") {
        saveUser();
      }
    });
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

exports.getAllMyBooksController = async (req, res) => {
  let userId = req.user.id;
  try {
    let allusers = await User.find({ _id: userId }).populate("books");
    res.json(allusers);
  } catch (error) {
    res.json(error);
  }
};

exports.getAllMyBooksController = async (req, res) => {
  try {
    let userId = req.user.id;
    let allusers = await User.find({ _id: userId }).populate("books");
    res.json(allusers);
  } catch (error) {
    res.json(error);
  }
};
