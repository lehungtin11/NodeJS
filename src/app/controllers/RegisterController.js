const MyModel = require('../models/register')

class RegisterController {

    // [GET] /register
    index(req, res, next) {
        // Check if user already login
        if(req.session.username) res.redirect('/')
        res.render('register')
    }

    // [POST] /register/create
    create(req, res, next) {
        Promise.all([MyModel.findOne({email:req.body.email}),MyModel.findOne({username:req.body.username})])
        .then(async ([email,username]) => {
            if(email !== null) return res.status(403).send('<h1 style="text-align:center; margin-top:20vh">Email đã tồn tại.<br> <a href="/register">Trở lại</a></h1>')
            if(username !== null) return res.status(403).send('<h1 style="text-align:center; margin-top:20vh">Username đã tồn tại.<br> <a href="/register">Trở lại</a></h1>') 
            const register = new MyModel(req.body)
            await register.save()
            res.redirect('/login')
            }
        )
        .catch(err => new Error('Opps, error at :',err))
    }
}

module.exports = new RegisterController;
