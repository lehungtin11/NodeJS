const MyModel = require('../models/register')
const toObject = require('../../helpers/toObject')

class PaymentController {
    index(req, res) {
        let param = req.params
        try {
            if(param.slug == 'htmlcss') {
                MyModel.findOne({username: req.session.username}).then((data) => {
                    if(!data) {
                        return res.redirect('/login')
                    }
                    if(data.activedCourses == '1') {
                        res.redirect('/courses?category=html-css')
                    } else {
                        res.render('payment', {
                            data: toObject.oneData(data),
                            layout: 'noSearchBox'
                        })
                    }
                })
            }
        } catch (error) {
            console.log('Error', error)
            return new Error(error)   
        }
    }
}

module.exports = new PaymentController;
