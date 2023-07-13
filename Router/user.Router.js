const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");
const { DataModel } = require("../model/data.Model");
const { UserAuth } = require("../authenticate/auth");
const { CartModel } = require("../model/cartItem");
const User = express.Router();

//normal user for signup method ......
User.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      return res.send({ message: "Allready have an Account please login" });
    }
    bcrypt.hash(password, 5, async function (err, hash) {
      // Store hash in your password DB.
      console.log(password, hash);
      const userdata = new UserModel({ name, email, password: hash });
      await userdata.save();
      return res.send({ message: "signup succesfully" });
    });
  } catch (err) {
    console.log("err from user router signup method");
    console.log(err);
  }
});

//normal user for login method........

User.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send({ message: "You don't have account first signup" });
  }
  const hashPassword = user.password;
  bcrypt.compare(password, hashPassword, function (err, result) {
    // result == true;
    if (!result) return res.send({ message: "wrong Password" });

    const token = jwt.sign({ userID: user._id }, "hussh");
    console.log(token);
    res.send({ message: "login successfully", token });
  });
});

User.post("/addtocart/:_id", UserAuth, async (req, res) => {
  try {
    const _id = req.params;
    // console.log(_id)
    const { userId } = req.body;
    const { title, Rating, Price, author } = await DataModel.findById(
      _id
    );
    console.log(title, Rating, Price, author, userId);
    const data = new CartModel({ title, Rating, Price, author, userId });
    await data.save();
    return res.send({ "message ": "item added to cart" });
  } catch (err) {
    console.log("err from user router addtocart routes");
    console.log(err);
    res.send({ message: "someting went wrong" });
  }
});

User.get("/cartItem", UserAuth, async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await CartModel.find({ userId });
    res.send({ message: data });
  } catch (err) {
    console.log("err form user router cart ");
  }
});

User.delete("/delete/:_id", UserAuth, async (req, res) => {
  const _id = req.params;
  const { userId } = req.body;

  const data = await CartModel.findOneAndDelete({ _id, userId });
  if (!data) {
    return res.send({ message: "not authorize" });
  }

  return res.send({ message: "succesfully deleted" });
});

module.exports = { User };
