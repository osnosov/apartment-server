const Router = require('koa-router');
const passport = require('koa-passport');

const { destroySessionsByUserId } = require('../models/sessions');

const router = new Router({
  prefix: '/auth',
});

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', (err, token) => {
    if (token === false) {
      ctx.body = { error: 'Login failed' };
    } else {
      ctx.body = { token };
    }
  })(ctx, next);
});

router.post('/logout', async (ctx, next) => {
  await passport.authenticate('jwt', async (err, user) => {
    if (user) {
      await destroySessionsByUserId(user.id);
      ctx.body = { success: true };
    } else {
      ctx.status = 401;
      ctx.body = { error: 'unauthorized' };
    }
  })(ctx, next);
});

module.exports = router.routes();
