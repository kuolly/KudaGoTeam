const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");

router.get("/", async (req, res) => {
  let users = await userModel.find();
  res.locals.users = users;
  res.render("index");
});

module.exports = router;
