const express = require("express");
const router = express.Router();
const { Event, Tag } = require("../model/model");
const { model, modelNames } = require("mongoose");

router.get("/add", (req, res) => {
  res.render("add_event");
});

router.get("/events", async (req, res) => {
  let result = await Event.find({});
  res.render("event_page", { result: result });
});

router.post("/delete/:id", async (req, res) => {
  console.log("----->>>>", req.params.id);
  await Event.deleteOne({ _id: req.params.id });
  res.redirect("/form/events");
});

router.post("/edit/:id", async (req, res) => {
  console.log("->>>>>>", req.body);
  await Event.updateOne({ _id: req.params.id }, req.body);
  res.redirect("/event_page");
});

router.post("/events", async (req, res) => {
  req.body.date = new Date();
  let {
    title,
    short_description,
    arr_img,
    main_img,
    long_description,
    dates,
    place,
    videos,
    status,
    tag,
  } = req.body;
  console.log("tagssss----->>>>", req.body.tag);
  tags = tag.split(",");
  console.log("------> REQ BODY", req.body.tag);
  await Event.create({
    title,
    short_description,
    arr_img,
    main_img,
    long_description,
    dates,
    place,
    videos,
    status,
    tag: tags,
  });
  await Tag.create({ tag: tags });
  res.redirect("/form/events");
});

module.exports = router;
