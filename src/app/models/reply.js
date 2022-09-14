const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const reply = new Schema({
  avatar: {type: String},
  username: {type: String},
  content: {type: String},
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
    },
  }, {
    timestamps: true
  });
  
reply.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

module.exports = mongoose.model('Reply', reply);