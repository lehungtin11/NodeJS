
class SettingController {
  
    index(req, res, next) {
        res.render('setting', {
          username: req.session.username,
        });
      }
}
module.exports = new SettingController;