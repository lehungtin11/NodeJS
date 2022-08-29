const MyModel = require('../models/course')

class NewsController {

    // [GET] /news
    index(req, res) {     
        MyModel.find()
        .then(docs => res.render('news',{data:docs.map(doc=>doc.toObject())}))
        .catch(err=>{})
      };
    //   [GET] /news/show
    show(req, res) {
        res.render('show');
    }
}

module.exports = new NewsController;
