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



router.post('/delete/:id', async (req, res) => {
  console.log('----->>>>', req.params.id);
  await Entry.deleteOne({ _id: req.params.id })
  res.redirect('/event_page')
})


router.post('/edit/:id', async (req, res) => {
  console.log('->>>>>>', req.body);
  await Entry.updateOne({ _id: req.params.id }, req.body)
  res.redirect('/event_page')
})

router.post("/events", async (req, res) => {
  req.body.date = new Date();
  let { eventName, shortEventDesc, img_url, longEventDesc, tag } = req.body
  console.log('tagssss----->>>>', req.body.tag);
  tags = tag.split(",");
  console.log("------> REQ BODY", req.body.tag);
  await eventModel.create({ eventName, shortEventDesc, img_url, longEventDesc, tag: tags });
  await tagModel.create({ tag: tags });
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
