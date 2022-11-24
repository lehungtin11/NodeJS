const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const GroupCoursesController = require('../app/controllers/GroupCoursesController')

router.get('/', GroupCoursesController.index)
router.delete('/soft-delete/:id', GroupCoursesController.softDelete)
router.delete('/trash-bin/:id', GroupCoursesController.destroy)
router.get('/update', GroupCoursesController.update)
router.put('/updated', GroupCoursesController.updated)
router.get('/trash-bin', GroupCoursesController.trashBin)
router.get('/restore', GroupCoursesController.restore)
router.get('/create', GroupCoursesController.create)
router.post('/create', GroupCoursesController.create)


module.exports = router