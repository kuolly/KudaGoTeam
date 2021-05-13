const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const check = require("../middlewares/check");


router.get("/", async (req, res) => {
  let users = await userModel.find();
  res.locals.users = users;
  res.render("index");
});

router.get("/admin", check, (req, res) => {
  res.render("admin");
});

module.exports = router;
