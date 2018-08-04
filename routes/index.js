const Router = require('koa-router');

const auth = require('./auth');
const user = require('./user');

const router = new Router({
  prefix: '/api/v1',
});

router.use(auth);
router.use(user);

module.exports = router;
