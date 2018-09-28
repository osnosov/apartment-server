const Router = require('koa-router');
const passport = require('koa-passport');

const { destroySessionsByUserId } = require('../models/sessions');

const router = new Router({
  prefix: '/auth',
});

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', (err, token) => {
    if (token === false) {
      ctx.status = 403;
      ctx.body = { status: 'error', message: 'Authentication failed' };
    } else {
      ctx.body = { status: 'success', message: 'Login success', token };
    }
  })(ctx, next);
});

router.post('/logout', async (ctx, next) => {
  await passport.authenticate('jwt', async (err, user) => {
    if (user) {
      await destroySessionsByUserId(user.id);
      ctx.body = { status: 'success', message: 'Logout successful' };
    } else {
      ctx.status = 401;
      ctx.body = { status: 'error', message: 'Unauthorized' };
    }
  })(ctx, next);
});

module.exports = router.routes();
