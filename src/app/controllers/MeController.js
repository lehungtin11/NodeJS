const MyModel = require('../models/course')
const ToObject = require('../../helpers/toObject')

class MeController {

    // [PUT] /courses/updated
    updated(req, res, next) {
        req.body.slug = req.body.videoId;
        MyModel.updateOneWithDeleted({_id: req.query.slug}, req.body, function(err) {
            if(err) return console.log(err)
        })
        res.redirect('/courses/me/manage')
    }

    // [GET] /courses/me/manage
    manage(req, res, next) {
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
                res.render('me/store-course', {
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

    // [DELETE] /courses/me/:id
    delete(req, res, next) {
        MyModel.delete({_id: req.params.id})
        .then(res.redirect('/courses/me/manage'))
        .catch(next)
    }

    // [DELETE] /courses/me/deletemany
    deleteMany(req, res, next) {
        switch(req.body.type) {
            case 'delete':
                MyModel.delete({_id: req.body.deleteItem})
                .then(res.redirect('/courses/me/manage'))
                .catch(next)
            break;
        default:
            next()
        }
    }

    // [GET] /courses/me/trash
    trash(req, res, next) {
        // 
        // Note change this handle pagination to module
        // 
        var page = parseInt(req.query.page) || 1;
        var perPage = 5;
        var start = (page - 1) * perPage;
        var end = (page - 1) * perPage + perPage;
        Promise.all([MyModel.findDeleted(),MyModel.countDeleted()])
        .then(([data, total]) => {
            var totalPage = Math.ceil(total/perPage);
            if(total <= 0 || page >= 0 && page <= totalPage ) {
                total <= 0 ? page = 1 :'' ;
                res.render('me/trash-bin', {
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

    // [DELETE] /courses/me/trash/:id
    destroy(req, res, next) {
        MyModel.deleteOne({_id: req.params.id})
        .then(res.redirect('/courses/me/trash'))
        .catch(next)
    }

    // [GET] /courses/restore
    restore(req, res, next) {
        MyModel.restore({slug: req.query.slug})
        .then(res.redirect('back'))
        .catch(next)
    }
    
    // [GET] /courses/handleTrash
    handleTrash(req, res, next) {
        switch (req.body.type) {
            case 'restore': 
                MyModel.restore({_id: req.body.deleteItem})
                .then(res.redirect('back'))
                .catch(next)
            break;
            case 'trulyDelete': 
                MyModel.deleteMany({_id: req.body.deleteItem})
                .then(res.redirect('back'))
                .catch(next)
            break;
        default:
            next()
        }
    }
}

module.exports = new MeController;
