const MyModel = require('../models/course')
const CommentModel = require('../models/comment')
const ReplyModel = require('../models/reply')
const GroupCourses = require('../models/groupCourses')
const ToObject = require('../../helpers/toObject')

class CoursesController {

    // [GET] /courses
    index(req, res, next) {
        if(req.query.category) {
            MyModel.find({name: req.query.category})
            .then(docs => res.render('course/courses',{data: ToObject.manyData(docs)}))
            .catch(() => res.redirect('/not-found'))
        } else {
            res.redirect('/not-found')
        }
      };

    //   [GET] /courses/:_id
    show(req, res, next) {
        Promise.all([
            MyModel.findOne({_id: req.params.id}),
            CommentModel.find({courseId: req.params.id}),
            CommentModel.count({courseId: req.params.id}),
            MyModel.find({name: req.query.name}),
            MyModel.findOne({_id: req.params.id})
        ])
        .then(([data, comment, countComment, totalVideos, currentVideo]) => {
                let highLight;
                (currentVideo) ? highLight = true : highLight = false
                const totalReplyComment = comment.map(data => data.reply.length)
                res.render('detail', {
                    countComment,
                    totalReplyComment,
                    data: ToObject.oneData(data),
                    comment: ToObject.manyData(comment),
                    totalVideo: ToObject.manyData(totalVideos),
                    current: highLight,
                    currentVi: ToObject.oneData(currentVideo)
                })
            })
        .catch(() => {
            res.redirect('/not-found')
        })
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

    // [DELETE] /courses/reply/delete
        deleteReply(req, res, next) {
            const commentId = req.query.commentId;
            const replyId = req.query.replyId;
            CommentModel.find({_id: commentId})
            .then((data) => {
                data[0].reply.map(async (dat, index) => {
                    if(dat._id == replyId) {
                        data[0].reply.splice(index, 1)
                        await CommentModel().save()
                        return res.redirect('back')
                    }
                })
            })
            .catch()
        }

    // [GET] /courses/create
    create(req, res, next) {
        GroupCourses.find()
        .then(data => {
            res.render('course/create', {
                data: ToObject.manyData(data)
            })
        })
        .catch(next)
    }

    // [POST] /courses/store
    async store(req, res, next) {
        const course = new MyModel(req.body)
        await course.save(err => {
            if(err) return console.log(err)
        })
        res.redirect('back')
    }

    // [GET] /courses/update/:slug
    update(req, res, next) {
        Promise.all([
            GroupCourses.find(),
            MyModel.findOne({_id: req.query.slug}),
        ])
        .then(([groupCourses, data]) => {
            res.render('course/update',{
                group: ToObject.manyData(groupCourses),
                data: ToObject.oneData(data),
            })
        })
        .catch(next)
    }

}

module.exports = new CoursesController;
