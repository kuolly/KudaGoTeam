const { Schema, model, pluralize } = require("mongoose");
const mongoose = require("mongoose");
pluralize(null);

const TagsSchema = new Schema({
  name: String,
});

const Tag = model("Tags", TagsSchema);

const EventSchema = new Schema({
  title: String,
  short_description: String,
  arr_img: Array,
  main_img: String,
  long_description: String,
  dates: Array,
  place: String,
  videos: Array,
  tags: Array,
  status: String,
});

const Event = model("Events", EventSchema);

module.exports = { Tag, Event };
