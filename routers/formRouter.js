const express = require('express');
const router = express.Router();
const { Event, Tag } = require('../model/model');
const { model, modelNames } = require('mongoose');

let eventModel = model("Events", Event)
let tagModel = model("Tag", Tag)


router.get('/add', (req, res) => {
    res.render('add_event')
})


router.post('/events/add', async (req, res) => {
    req.body.date = new Date();
    req.body.tag = req.body.tag.split(',')
    await eventModel.create(req.body);
    await tagModel.create(req.body);
    res.redirect('/events')
})



router.get('/', (req, res) => {
    res.render('layout')
})

router.get('/events', async (req, res) => {
    let result = await eventModel.find({});
    res.render('event_page', { result: result });
})

module.exports = router;
