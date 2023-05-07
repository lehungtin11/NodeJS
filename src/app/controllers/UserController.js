const MyModel = require('../models/register')
const ToObject = require('../../helpers/toObject')

class UserController {

    // [GET] /user
    index(req, res, next) {
        // Handle pagination
        var page = parseInt(req.query.page) || 1;
        var perPage = 5;
        var start = (page - 1) * perPage;
        var end = (page - 1) * perPage + perPage;

        // Get data from DB
        Promise.all([MyModel.countDeleted(),MyModel.find(),MyModel.count()])
        .then(([deleteCount, data, total]) => {
            var totalPage = Math.ceil(total/perPage);
            if(total <= 0 || page >= 0 && page <= totalPage ) {

                // Set default page = 1 when there is no item found
                total <= 0 ? page = 1 :'' ;
                res.render('user/index', {
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
    };

    // [GET] /edit
    edit(req, res) {
        let isAdmin = false;
        if(req.query.admin == 'true') isAdmin = true
        MyModel.findById(req.query.slug)
        .then((data) => {
            res.render('user/edit', {
                isAdmin,
                data: ToObject.oneData(data),
            })
        })
    }

    // [PUT] /update
    update(req, res) {
        try {
            if(req.query.slug && req.session.username =='Lehungtin11') {
                if(req.body.activedCourses !== '1') req.body.activedCourses = ''
                MyModel.updateOneWithDeleted({_id: req.query.slug}, req.body, function(err) {
                    if(err) return console.log(err)
                })
                res.redirect('/manage/user')
            } else {
                MyModel.updateOneWithDeleted({_id: req.query.slug}, req.body, function(err) {
                    if(err) return console.log(err)
                })
                res.redirect('/setting')
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    // [DELETE] /delete
    delete(req, res, next) {
        MyModel.deleteOne({_id: req.query.slug})
        .then(res.redirect('/manage/user'))
        .catch(next)
    }

    // [GET] /black-list
    blackList(req, res, next) {
        let page = parseInt(req.query.page) || 1;
        let perPage = 5;
        let start = (page - 1) * perPage;
        let end = (page - 1) * perPage + perPage;
        Promise.all([MyModel.findDeleted(),MyModel.countDeleted()])
        .then(([data, total]) => {
            let totalPage = Math.ceil(total/perPage);
            if(total <= 0 || page >= 0 && page <= totalPage ) {
                total <= 0 ? page = 1 :'' ;
                res.render('user/blackList', {
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
    
    // [DELETE] /ban
    ban(req, res, next) {
        MyModel.delete({_id: req.params.id})
        .then(res.redirect('/manage/black-list'))
        .catch(next)
    }
}

module.exports = new UserController;
