const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/abcd';

mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log('EEEEROOOR--->>>', error))

const Event = new Schema({
    eventName: String,
    date: Date,
    shortEventDesc: String,
    longEventDesc: String,
    img_url: String,
    tag: Array,
});



const Tag = new Schema({
    tag: Array,
})

module.exports = {
    Event,
    Tag,
};
