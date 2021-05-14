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

router.get("/admin", check, (req, res) => {
  res.render("admin");
});

router.get("/event/:id", async (req, res) => {
  const post = posts.find((item) => item.id === +req.params.id);
  res.render("fullevent", post); //роут для рендера стр с полным описанием мероприятия
});

module.exports = router;
