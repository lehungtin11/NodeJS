const express = require('express')
const router = express.Router()
const settingController = require('../app/controllers/SettingController')

router.get('/', settingController.index)

module.exports = router