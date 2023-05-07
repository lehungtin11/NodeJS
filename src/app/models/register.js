const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const user = new Schema({
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true
    },
    avatar: {
      type: String,
      default: 'AMLnZu-bhMUE7-ouPMCU9jZPH1S_GC3_qa5RwbDX6KapRw=s68-c-k-c0x00ffffff-no-rj',
    },
    activedCourses: {
        type: String,
        default: ''
    },
  }, {
    timestamps: true
  });
  
user.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

module.exports = mongoose.model('User', user);