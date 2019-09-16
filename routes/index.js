const express = require('express');
const router = express.Router();
const generalController = require('../controllers/general');

router.get('/', generalController.index);

router.get('/contact-us', generalController.contact_us);

module.exports = router;
