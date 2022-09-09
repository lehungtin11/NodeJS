module.exports = function requiresLogin(req, res, next) {
  if (req.session && req.session.logged) {
    return next();
  } else {
    res.redirect('/login')
  }
}