const MyModel = require('../models/course')
const CommentModel = require('../models/comment')
const ReplyModel = require('../models/reply')
const ToObject = require('../../helpers/toObject')

class CoursesController {

    // [GET] /courses
    index(req, res, next) {     
        MyModel.find()
        .then(docs => res.render('course/courses',{data: ToObject.manyData(docs)}))
        .catch(next)
      };

    //   [GET] /courses/:slug
    show(req, res, next) {
        Promise.all([
            MyModel.findOne({slug: req.params.slug}),
            CommentModel.find({slug: req.params.slug}),
            CommentModel.count({slug: req.params.slug}),
            MyModel.find()
        ])
        .then(([data, comment, countComment, totalVideos]) => {
                const totalReplyComment = comment.map(data => data.reply.length)
                res.render('detail', {
                    countComment,
                    totalReplyComment,
                    data: ToObject.oneData(data),
                    comment: ToObject.manyData(comment),
                    totalVideo: ToObject.manyData(totalVideos),
                })
            })
            .catch(next)
    }

    //   [POST] /courses/comment/:slug
    async comment(req, res, next) {
        const comment = new CommentModel(req.body)
       await comment.save(err => {
            if(err) return new Error('Error at: ',err)
        })
        res.redirect('back')
    }

    // [POST] /courses/reply
        async reply(req, res, next) {
            const id = req.query._id
            const replies = new ReplyModel({
                username: req.body.username,
                avatar: req.body.avatar,
                content: req.body.content,
                comment: id,
            })
            replies.save()

            const comment = await CommentModel.findById(id);
            comment.reply.push(replies);
            await comment.save((err) => {
                if(err) console.log(err)
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
            .then(data => res.render('course/update',{data:ToObject.oneData(data)}))
            .catch(next)
    }

}

module.exports = new CoursesController;
