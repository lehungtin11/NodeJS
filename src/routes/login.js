const express = require('express')
const router = express.Router()
const LoginController = require('../app/controllers/LoginController')

router.post('/submit', LoginController.submit)
router.get('/', LoginController.index)

module.exports = router