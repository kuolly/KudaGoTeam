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
  await eventModel.create(req.body);
  await tagModel.create(req.body);
  res.redirect("/form/events"); 
});


module.exports = router;
