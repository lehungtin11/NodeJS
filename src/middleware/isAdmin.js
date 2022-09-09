module.exports = function isAdmin(req, res, next) {
    // Note to change this hardcode
    if(req.session.username == 'Lehungtin11') return next()
    res.status(401).send("<p style='text-align:center; color: red; font-size: 48px; margin-top:20vh'>You don't have permission to access this link!!<br> <a href='/'>Back</a></p>")
}