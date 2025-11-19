const { Router } = require('express');

const router = Router();

const controller = require('../controllers/contactController.js');

router.get('/', controller.contactPageGet);

module.exports = router;