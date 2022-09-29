const MyModel = require('../models/register')

class RegisterController {

    // [GET] /register
    index(req, res, next) {
        // Check if user already login
        if(req.session.username) res.redirect('/')
        res.render('register', {layout:'sub', accountExist: false,})
    }

    // [POST] /register/create
    create(req, res, next) {
        let existEmail, existUsername = false;
        if(req.session.username) res.redirect('/')
        Promise.all([
            MyModel.findOne({email:req.body.email}),
            MyModel.findOne({username:req.body.username})
        ])
        .then(async ([email,username]) => {
            if(email !== null || username !== null) {
                if(email !== null) existEmail = true;
                if(username !== null) existUsername = true;
                res.render('register', {
                    preEmail: req.body.email,
                    preUser: req.body.username,
                    prePass: req.body.password,
                    existEmail: existEmail,
                    existUsername: existUsername,
                    accountExist: true,
                    layout:'sub'
                })
            }
            const register = new MyModel(req.body)
            await register.save()
            res.render('register', {
                preEmail: req.body.email,
                preUser: req.body.username,
                prePass: req.body.password,
                accountExist: false,
                layout:'sub'
            })
            }
        )
        .catch(err => new Error('Opps, error at :',err))
    }
}

module.exports = new RegisterController;
