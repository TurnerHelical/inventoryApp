const { Router } = require('express');

const router = Router();

const controller = require('../controllers/appleController.js');

router.use((req, res, next) => {
  res.locals.appleArray = [];
  res.locals.name = '';
  res.locals.nickname = '';
  res.locals.origin = '';
  res.locals.color = '';
  res.locals.image_link = '',
  res.locals.AvgPrice = '';
  res.locals.notes = '';
  next();
});

router.get('/new', controller.newAppleGet);

router.post('/new', controller.newApplePost);

router.get('/update/:id', controller.updateAppleFormGet);

router.post('/update/:id', controller.updateAppleFormPost);

router.get('/delete/:id', controller.deleteApple);

router.get('/', controller.getAllApplesRender);

router.get('/:id', controller.getAppleById);

module.exports = router;