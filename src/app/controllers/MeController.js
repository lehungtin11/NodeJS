const MyModel = require('../models/course')

class MeController {

    // [PUT] /courses/updated
    updated(req, res, next) {
        req.body.slug = req.body.name;
        MyModel.updateOneWithDeleted({slug: req.query.slug}, req.body, function(err) {
            if(err) return console.log(err)
        })
        res.redirect('/courses/me/manage')
    }

    // [GET] /courses/me/manage
    manage(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 5;
        var start = (page - 1) * perPage;
        var end = (page - 1) * perPage + perPage;
        Promise.all([MyModel.countDeleted(),MyModel.find(),MyModel.count()])
        .then(([deleteCount, data, total]) => {
            res.render('me/store-course', {
                deleteCount,
                data: data.slice(start,end).map(ren=>ren.toObject()),
                totalPage: Math.ceil(total/perPage),
                currentPage: page,
            })
        })
        .catch(next)
    }

    // [DELETE] /courses/me/:id
    delete(req, res, next) {
        MyModel.delete({_id: req.params.id})
        .then( res.redirect('/courses/me/manage'))
        .catch(next)
    }

    // [DELETE] /courses/me/deletemany
    deleteMany(req, res, next) {
        switch(req.body.type) {
            case 'delete':
                MyModel.delete({_id: req.body.deleteItem})
                .then( res.redirect('/courses/me/manage'))
                .catch(next)
            break;
        default:
            next()
        }
    }

    // [GET] /courses/me/trash
    trash(req, res, next) {
        MyModel.findDeleted()
        .then(docs => res.render('me/trash-bin',{data:docs.map(doc=>doc.toObject())}))
        .catch(next)
    }

    // [DELETE] /courses/me/trash/:id
    destroy(req, res, next) {
        MyModel.deleteOne({_id: req.params.id})
        .then( res.redirect('/courses/me/trash'))
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
