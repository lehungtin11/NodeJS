const express = require('express')
const router = express.Router()
const PaymentController = require('../app/controllers/PaymentController')

router.get('/', (req, res) => {
    res.redirect('/')
})

router.get('/:slug', PaymentController.index)

module.exports = router