const MyModel = require('../models/course')

class CoursesController {

    // [GET] /courses
    index(req, res, next) {     
        MyModel.find()
        .then(docs => res.render('course/courses',{data:docs.map(doc=>doc.toObject())}))
        .catch(next)
      };

    //   [GET] /courses/:slug
    show(req, res, next) {
        if(!req.query.del) {
            MyModel.findOne({slug: req.params.slug})
            .then(docs => res.render('detail', {data:docs.toObject()}))
            .catch(next)
        }
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('course/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        const course = new MyModel(req.body)
        course.save(err => {
            if(err) return console.log(err)
        })
        res.redirect('/courses')
    }

    // [GET] /courses/update/:slug
    update(req, res, next) {
            MyModel.findOne({slug: req.query.slug})
            .then(docs => res.render('course/update',{data:docs.toObject()}))
            .catch(next)
    }

}

module.exports = new CoursesController;
