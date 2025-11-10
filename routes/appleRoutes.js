const { Router } = require('express');

const router = Router();

const controller = require('../controllers/appleController.js');

router.use((req, res, next) => {
  res.locals.appleArray = [];
  res.locals.name = '';
  res.locals.nickname = '';
  res.locals.origin = '';
  res.locals.quantity = '';
  res.locals.color = '';
  res.locals.price = '';
  res.locals.best_month = '';
  next();
});

router.get('/', controller.getAllApplesRender);

router.get('/:id', controller.getAppleById);

router.get('/new', controller.newAppleGet);

router.post('/new', controller.newApplePost);

router.get('/update/:id', controller.updateAppleFormGet);

router.get('/update/:id', controller.updateAppleFormGet);

router.put('/update/:id', controller.updateAppleFormPut);

router.get('/delete/:id', controller.deleteApple);

module.exports = router;