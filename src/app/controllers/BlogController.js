const MyModel = require('../models/course')

class BlogController {

    // [GET] /blog
    index(req, res) {     
        MyModel.find()
        .then(docs => res.render('blog',{data:docs.map(doc=>doc.toObject())}))
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
