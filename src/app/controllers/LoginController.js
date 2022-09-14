const MyModel = require('../models/register')
const ToObject = require('../../helpers/toObject')

class LoginController {

    // [GET] /login
    index(req, res, next) {
        // Check if user already login
        if(req.session.username) res.redirect('/')
        res.render('login',{layout:'sub'})
    }

    // [POST] /submit
    async submit(req, res, next) {
        try {
            if(!req.body.username || !req.body.password) {
                res.send("<h1 style='text-align:center; margin-top: 20vh'>Username and Password is required. <a href='/login'>Back</a></h1>")
            }   
           await MyModel.findOne({username: req.body.username, password: req.body.password})
            .then(data => {
                if(data !== null) {
                    var sess = req.session;
                    sess.logged = true;
                    sess.username = req.body.username
                    sess.avatar = data.avatar || 'AMLnZu-bhMUE7-ouPMCU9jZPH1S_GC3_qa5RwbDX6KapRw=s68-c-k-c0x00ffffff-no-rj'
                    res.render('login', {
                        data: ToObject.oneData(data),
                        layout: 'sub'
                    })
                } else {
                    res.render('login', {
                        preUsername: req.body.username,
                        prePassword: req.body.password,
                        data: 'not found',
                        layout: 'sub'
                    })
                }
            })
            .catch((err)=>{
                new Error('Opps, error at: ', err)
            })

        } catch (error) {
            new Error('Error at',error)
        }
    }
}

module.exports = new LoginController;
