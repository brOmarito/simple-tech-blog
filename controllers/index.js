const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
// router.use('/api', apiRoutes);

module.exports = router;
