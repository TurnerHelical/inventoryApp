const {Router} = require('express');

const router = Router();

const homeRouter = require('./routes/homeRoutes');
const appleRouter = require('./routes/appleRoutes');

router.use('/', homeRouter);
router.use('/apple', appleRouter);

module.exports = router