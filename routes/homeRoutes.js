const { Router } = require('express');

const router = Router();

const controller = require('../controllers/homeController.js');

router.get('/', controller.homepageGet);