const Router = require('koa-router');

const { getUsers } = require('../services/user');

const router = new Router({
  prefix: '/users',
});

router.get('/', async ctx => {
  ctx.body = await getUsers();
});

module.exports = router.routes();
