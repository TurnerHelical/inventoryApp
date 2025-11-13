const {Router} = require('express');

const router = Router();

const homeRouter = require('../routes/homeRoutes.js');
const appleRouter = require('../routes/appleRoutes.js');

router.use('/', homeRouter);
router.use('/apple', appleRouter);

module.exports = router;