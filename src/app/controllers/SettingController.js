const MyModel = require('../models/register')
const ToObject = require('../../helpers/toObject')

class SettingController {
  
    index(req, res, next) {
        MyModel.findOne({username: req.session.username, avatar: req.session.avatar})
        .then((data) => {
            res.render('setting', {
              data: ToObject.oneData(data),
            });
        })
      }
}
module.exports = new SettingController;