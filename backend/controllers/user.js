const userModel = require("../models/user.js");
const { log } = require("console");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await new userModel(req.body); // create a new instance of the User model with the new user data from req.body
    const newUserInstance = await newUser.save(); // save the new user instance to the database
    res.json({
      success: true,
      message: "User registered successfully, login to continue",
    });
  } catch (error) {
    log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    log("isMatch :", isMatch);
    if (isMatch) {
      const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 72000; // ten hour validity for token
      const payload = {
        id: user._id,
        name: user.username,
        exp: expiryDateTime,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "None", // Necessary if your frontend and backend are on different origins and you're using secure cookies
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        })
        .json({
          success: true,
          message: "Welcome back " + user.username + "!",
          token: token,
          user: user,
        });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  }
};

const userLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "None", // Necessary if your frontend and backend are on different origins and you're using secure cookies
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  }).json({
    success: true,
    message: "Logged out successfully!",
  });
};

const saveUserAddress = async (req, res) => {
  const originalData = req.body;
  const setObject = {};
  if (originalData.address) {
    setObject["address.address"] = originalData.address;
  }

  if (originalData.city) {
    setObject["address.city"] = originalData.city;
  }

  if (originalData.state) {
    setObject["address.state"] = originalData.state;
  }

  if (originalData.pincode) {
    setObject["address.pincode"] = originalData.pincode;
  }

  const updateObject = {
    $set: setObject,
  };
  try {
    const updateResult = await userModel.findByIdAndUpdate(
      req.user._id,
      updateObject
    );
    res.json({
      success: true,
      message: "User address saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(res.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};

const likeDislikeController = async (req, res) => {
  let message = "";
  let updateObject = {};
  try {
    const user = await userModel.findById(req.user._id);

    if (
      req.params.action === "likes" &&
      user.likes.includes(req.params.movieId)
    ) {
      updateObject = {
        $pull: {
          likes: req.params.movieId,
        },
      };
      message = "like removed successfully";
    } else if (
      req.params.action === "dislikes" &&
      user.dislikes.includes(req.params.movieId)
    ) {
      updateObject = {
        $pull: {
          dislikes: req.params.movieId,
        },
      };
      message = "dislike removed successfully";
    } else if (
      req.params.action === "likes" &&
      user.dislikes.includes(req.params.movieId)
    ) {
      updateObject = {
        $pull: {
          dislikes: req.params.movieId,
        },
        $push: {
          likes: req.params.movieId,
        },
      };
      message = "like added successfully";
    } else if (
      req.params.action === "dislikes" &&
      user.likes.includes(req.params.movieId)
    ) {
      updateObject = {
        $pull: {
          likes: req.params.movieId,
        },
        $push: {
          dislikes: req.params.movieId,
        },
      };
      message = "dislike added successfully";
    } else {
      let increase = 1;
      if (req.params.action === "dislikes") {
        increase = 0;
      }
      updateObject = {
        $push: {
          [req.params.action]: req.params.movieId,
        },
      };
      message = `${req.params.action} added successfully`;
    }
    const updateduser = await userModel
      .findByIdAndUpdate(req.user._id, updateObject, { new: true })
      .select(["-password", "-__v"]);
    log(updateduser);
    res.json({
      success: true,
      message: message,
      updatedUser: updateduser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.json({
      success: true,
      message: "Favourites List has been successfully retrieved.",
      favourites: user.favourites,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  let user = req.user.toObject();
  delete user.password;
  res.json({
    success: true,
    message: "User has been successfully retrieved.",
    user: user,
  });
};

module.exports = {
  userLogin,
  userRegistration,
  userLogout,
  saveUserAddress,
  likeDislikeController,
  getFavourites,
  getUser,
};
