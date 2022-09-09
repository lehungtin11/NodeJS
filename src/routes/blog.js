const blogController = require('../app/controllers/BlogController')
const express = require('express')
const router = express.Router()

router.get('/show',blogController.show)
router.get('/',blogController.index)

module.exports = router