const { Router } = require("express");
const router = Router();
const userModel = require("../model/user.model");
const check = require("../middlewares/check");
const { Tag, Event } = require("../model/model");

router.get("/", async (req, res) => {
  let users = await userModel.find();
  res.locals.users = users;
  const postFromBase = await Event.find().lean();

  const posts1 = postFromBase.splice(0, 9).map((el, index) => ({
    ...el,
    stylebox: "box" + index,
  }));

  const posts2 = postFromBase;
  console.log(posts1.length);
  console.log(posts2.length);
  res.render("index", { posts1, posts2 });
});



router.get("/events/:id", async (req, res) => {
  // console.log(req.params.id);
  const post = await Event.findById(req.params.id);
  // console.log(post);
  res.render("fullevent", {post}); //роут для рендера стр с полным описанием мероприятия
});

module.exports = router;
