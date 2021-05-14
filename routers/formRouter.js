const express = require("express");
const router = express.Router();
const { Event, Tag } = require("../model/model");
const { model, modelNames } = require("mongoose");



router.get("/add", (req, res) => {
  res.render("add_event");
});

router.get("/events", async (req, res) => {
  let result = await eventModel.find({});
  res.render("event_page", { result: result });
});

router.post("/events", async (req, res) => {
  req.body.date = new Date();
  req.body.tag = req.body.tag.split(",");
  await Event.create(req.body);
  await Tag.create(req.body);
  res.redirect("/form/events"); 
});

// router.post("/form", async (req, res) => {
//   const { fruit, vegetables, makaroni } = req.body;
//   console.log(req.body);
//   if (fruit && vegetables && makaroni) {
//     const currentForm = await formModel.create({ fruit, vegetables, makaroni });
//     console.log(currentForm);
//     if (currentForm) {
//       return res.status(200).redirect("/");
//     }
//     return res.status(418).redirect("/user/form");
//   }
//   return res.status(418).redirect("/user/form");
// });





module.exports = router;
