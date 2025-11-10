const { Router } = require('express');

const router = Router();

const controller = require('../controllers/appleController.js');

router.get('/', controller.appleInvGet);

router.get('/:id', controller.getAppleById);

router.get('/new', controller.newAppleGet);

router.post('/new', controller.newApplePost);

router.get('/update/:id', controller.updateAppleFormGet);

router.put('/update/:id', controller.appleUpdate);

router.get('/delete/:id', controller.deleteApple);

