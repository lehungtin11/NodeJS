const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const groupCourses = new Schema({
    thumbnail: {type: String},
    title: {type: String},
    name: {type: String},
    type: {type: String},
  }, {
    timestamps: true
  });
  
groupCourses.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

module.exports = mongoose.model('groupCourses', groupCourses);