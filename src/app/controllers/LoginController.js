const MyModel = require('../models/register')

class LoginController {

    // [GET] /login
    index(req, res, next) {
        // Check if user already login
        if(req.session.username) res.redirect('/')
        res.render('login')
    }

    // [POST] /submit
    async submit(req, res, next) {
        try {
            if(!req.body.username || !req.body.password) {
                res.send('<h1 style="text-align:center; margin-top: 20vh">Tài khoản hoặc mật khẩu không được để trống. <a href="/login">Trở lại</a></h1>')
            }   
           await MyModel.findOne({username: req.body.username, password: req.body.password})
            .then(data => {
                if(data !== null) {
                    var sess = req.session;
                    sess.logged = true;
                    sess.username = req.body.username
                    sess.avatar = data.avatar
                    res.redirect('/')
                } else {
                    res.send(('<div style="height: 50vh;display:flex; align-items:center; justify-content:center"><h1 style="">Wrong info, try again <a href="/login" >here</a></h1></div>'))
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
