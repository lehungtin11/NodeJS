const express = require('express')
const router = express.Router()

// GET /logout
router.get('/', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                    return res.redirect('/');
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router
