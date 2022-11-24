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

    // [DELETE] /soft-delete/:id
    softDelete(req, res, next) {
        MyGroupCourses.delete({_id: req.params.id})
        .then(res.redirect('/group-courses'))
        .catch(next)
    }

    // [GET] /trash-bin
    trashBin(req, res, next) {
        let page = parseInt(req.query.page) || 1;
        let perPage = 5;
        let start = (page - 1) * perPage;
        let end = (page - 1) * perPage + perPage;
        Promise.all([MyGroupCourses.findDeleted(),MyGroupCourses.countDeleted()])
        .then(([data, total]) => {
            let totalPage = Math.ceil(total/perPage);
            if(total <= 0 || page >= 0 && page <= totalPage ) {
                total <= 0 ? page = 1 :'' ;
                res.render('groupCourses/trash', {
                    data: ToObject.manyData(data.slice(start,end)),
                    username: req.session.username,
                    totalPage: totalPage,
                    currentPage: page,
                })
            } else {
                res.render('notFound')
            }
        })        
        .catch(next)
    }

    // [DELETE] /group-courses/trash-bin/:id
    destroy(req, res, next) {
        MyGroupCourses.deleteOne({_id: req.params.id})
        .then(res.redirect('/group-courses/trash-bin'))
        .catch(next)
    }

    // [GET] /restore
    restore(req, res, next) {
        MyGroupCourses.restore({name: req.query.slug})
        .then(res.redirect('back'))
        .catch(next)
    }

    // [GET] /update
    update(req, res, next) {
            MyGroupCourses.findOne({_id: req.query.slug})
        .then((data) => {
            res.render('groupCourses/update',{
                data: ToObject.oneData(data),
            })
        })
        .catch(next)
    }
    
    // [GET] /updated
    updated(req, res, next) {
        req.body.slug = req.body.thumbnail;
        MyGroupCourses.updateOneWithDeleted({_id: req.query.slug}, req.body, function(err) {
            if(err) return console.log(err)
        })
        res.redirect('/group-courses')
    }
}

module.exports = new GroupCoursesController