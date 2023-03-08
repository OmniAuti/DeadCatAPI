const express = require('express');
const router = express.Router();
const {basicConnection, getData, postDeadCatData} = require('../controllers/controllers')
const dataTest = require('../models/models')

// const test = require('../controllers/controllers');
router.get('/', basicConnection)

router.get('/getData', getData)

router.post('/postData', postDeadCatData)

module.exports = router