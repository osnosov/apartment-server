const Router = require('koa-router');

const auth = require('./auth');
const user = require('./user');
const type = require('./type');

const router = new Router();

router.use(auth);
router.use(user);
router.use(type);

module.exports = router;
