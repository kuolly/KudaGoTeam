const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  const { name, email, password } = req.body;
  res.locals.name = name;
  res.render("signup", { name });
});

router.post("/signup", async (req, res) => {
  const { name, email, password, type } = req.body;
  if (name && email && password) {
    // const hashPass = await bcrypt.hash(password, 10);
    // console.log(hashPass);
    const currentUser = await userModel.create({
      name,
      email,
      password, // hashPass,
      admin: type,
    });
    console.log(currentUser);
    if (currentUser) {
      req.session.user = {
        id: currentUser._id,
        type: currentUser.admin,
        
      };

      return res.status(200).redirect("/");
    }
    return res.status(418).redirect("/signup");
  }
  return res.status(418).redirect("/signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { name, password } = req.body;
  const userObj = await userModel.findOne({ name })
  if (userObj && userObj.password === password) {
    console.log("if");
    req.session.user = userObj;
  }
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");

    res.clearCookie(req.app.get("cookieName"));
    return res.redirect("/");
  });
});

router.get("/form", (req, res) => {
  res.render("form");
});



module.exports = router;
