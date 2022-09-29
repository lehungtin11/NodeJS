const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const GroupCoursesController = require('../app/controllers/GroupCoursesController')

router.get('/', GroupCoursesController.index)
router.get('/create', GroupCoursesController.create)
router.post('/create', GroupCoursesController.create)


module.exports = router