const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')
const middleware = require('../middleware')

router.delete('/ban/:id', middleware.isAdmin, UserController.ban)
router.get('/black-list', middleware.isAdmin, UserController.blackList)
router.get('/user', middleware.isAdmin, UserController.index)
router.get('/edit', UserController.edit)
router.put('/update', UserController.update)
router.get('/delete', UserController.delete)

module.exports = router