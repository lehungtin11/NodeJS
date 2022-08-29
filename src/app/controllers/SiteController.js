
class SiteController {
    index(req, res) {
        res.render('home');
      }
}
module.exports = new SiteController;