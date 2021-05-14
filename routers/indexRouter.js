const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const check = require("../middlewares/check");
const { Tag, Event } = require("../model/model");


router.get("/", async (req, res) => {
  let users = await userModel.find();
  res.locals.users = users;
  const postFromBase = await Event.find().limit(9).lean()
  // console.log(postFromBase)
  const posts1 = postFromBase.map((el, index) => ({
    ...el,
    stylebox: "box" + index,
  }))
  // console.log(posts1);
  res.render("index", { posts1 });
});

router.get("/admin", check, (req, res) => {
  res.render("admin");
});

router.get("/events/:id", async (req, res) => {
  // console.log(req.params.id);
  const post = await Event.findById(req.params.id);
  // console.log(post);
  res.render("fullevent", {post}); //роут для рендера стр с полным описанием мероприятия
});



module.exports = router;
