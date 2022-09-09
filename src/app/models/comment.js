const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const comment = new Schema({
  avatar: {type: String},
  username: {type: String},
  content: {type: String},
  slug: {type: String},
  reply: [{type: String}],
  }, {
    timestamps: true
  });
  
comment.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

module.exports = mongoose.model('Comment', comment);