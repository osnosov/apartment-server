const Router = require('koa-router');

const user = require('./user');

const router = new Router({
  prefix: '/api/v1',
});

router.use(user);

module.exports = router;
