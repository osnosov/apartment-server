const Router = require('koa-router');
const passport = require('koa-passport');

const { getAllUser } = require('../models/user');

const router = new Router({
  prefix: '/users',
});

router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
  ctx.body = await getAllUser();
});

module.exports = router.routes();
