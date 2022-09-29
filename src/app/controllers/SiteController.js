const GroupCoursesModel = require('../models/groupCourses')
const ToObject = require('../../helpers/toObject')

class SiteController {
    // [GET] /
    index(req, res, next) {
      GroupCoursesModel.find()
      .then(data => {
        res.render('home', {
          frontendGroup: data.map(dt => {
            if(dt.type.includes('frontend')) {
              return ToObject.oneData(dt)
            }
          }),
          backendGroup: data.map(dt => {
            if(dt.type.includes('backend')) {
              return ToObject.oneData(dt)
            }
          }),
        })
      })
      .catch(err => new Error('Error at:', err))
      }
}
module.exports = new SiteController;