const MyModel = require('../models/course')
const CommentModel = require('../models/comment')

class CoursesController {

    // [GET] /courses
    index(req, res, next) {     
        MyModel.find()
        .then(docs => res.render('course/courses',{data:docs.map(doc=>doc.toObject())}))
        .catch(next)
      };

    //   [GET] /courses/:slug
    show(req, res, next) {
            Promise.all([
                MyModel.findOne({slug: req.params.slug}),
                CommentModel.find({slug: req.params.slug}),
                CommentModel.count({slug: req.params.slug})
            ])
            .then(([data, comment, countComment]) => {
                res.render('detail', {
                    data: data.toObject(),
                    comment: comment.map(com => com.toObject()),
                    countComment,
                })
            })
            .catch(next)
    }

    //   [POST] /courses/comment/:slug
    async comment(req, res, next) {
        const comment = new CommentModel(req.body)
       await comment.save(err => {
            if(err) return console.log(err)
        })
        res.redirect('back')
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('course/create')
    }

    // [POST] /courses/store
    async store(req, res, next) {
        const course = new MyModel(req.body)
        await course.save(err => {
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
