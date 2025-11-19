const {Router} = require('express');

const router = Router();

const homeRouter = require('../routes/homeRoutes.js');
const appleRouter = require('../routes/appleRoutes.js');
const contactRouter = require('../routes/contactRoutes.js');

router.use('/', homeRouter);
router.use('/apples', appleRouter);
router.use('/contact', contactRouter);

module.exports = router;