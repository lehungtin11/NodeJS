const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const course = new Schema({
    title: {type: String},
    name: {type: String},
    desc: {type: String},
    videoId: {type: String,},
    slug: {type: String, slug: "videoId", unique: true},
  }, {
    timestamps: true
  });
  
mongoose.plugin(slug);
course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

module.exports = mongoose.model('Course', course);