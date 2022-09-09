
class SiteController {
  
    index(req, res, next) {
        res.render('home', {
          username: req.session.username,
        });
      }
}
module.exports = new SiteController;