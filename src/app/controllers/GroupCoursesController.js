const MyGroupCourses = require('../models/groupCourses')
const ToObject = require('../../helpers/toObject')

class GroupCoursesController {

    // [GET] /group-courses/
    index(req, res, next) {
        MyGroupCourses.find()
        .then(data => {
            res.render('groupCourses/index',{
                data: ToObject.manyData(data)
            })
        })
        .catch(next)
    }

    // [GET]  /group-courses/create
    // &&
    // [POST] /group-courses/create
    async create(req, res, next) {
        if(req.body.title) {
            const newGroup = new MyGroupCourses(req.body)
            await newGroup.save()
            res.redirect('/group-courses')
        } else {
            res.render('groupCourses/create')
        }
    }

}

module.exports = new GroupCoursesController