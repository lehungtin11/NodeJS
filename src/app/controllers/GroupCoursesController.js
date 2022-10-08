const MyGroupCourses = require('../models/groupCourses')
const ToObject = require('../../helpers/toObject')

class GroupCoursesController {

    // [GET] /group-courses/
    index(req, res, next) {
        // Handle pagination
        var page = parseInt(req.query.page) || 1;
        var perPage = 5;
        var start = (page - 1) * perPage;
        var end = (page - 1) * perPage + perPage;
        
        // Get data from DB
        Promise.all([MyGroupCourses.countDeleted(),MyGroupCourses.find(),MyGroupCourses.count()])
        .then(([deleteCount, data, total]) => {
            var totalPage = Math.ceil(total/perPage);
            if(total <= 0 || page >= 0 && page <= totalPage ) {

                // Set default page = 1 when there is no item found
                total <= 0 ? page = 1 :'' ;
                res.render('groupCourses/index', {
                    deleteCount,
                    data: ToObject.manyData(data.slice(start,end)),
                    totalPage: totalPage,
                    currentPage: page,
                })
            } else {
                res.render('notFound')
            }
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

    // [PUT] /group-courses/update

}

module.exports = new GroupCoursesController