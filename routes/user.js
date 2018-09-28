const Router = require('koa-router');
const passport = require('koa-passport');

const acl = require('../services/acl');
const { getAllUser } = require('../models/user');

const router = new Router({
  prefix: '/users',
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    ctx.body = await getAllUser();
  }
);

module.exports = router.routes();
