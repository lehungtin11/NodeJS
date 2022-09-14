const MyModel = require('../models/course')
const ToObject = require('../../helpers/toObject')

class BlogController {

    // [GET] /blog
    index(req, res) {     
        MyModel.find()
        .then(docs => res.render('blog',{data: ToObject.manyData(docs)}))
        .catch(err=>{
            new Error('Error at: ', err)
        })
      };

    //   [GET] /blog/show
    show(req, res) {
        res.render('blog');
    }
}

module.exports = new BlogController;
