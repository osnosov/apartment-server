const Router = require('koa-router');
const passport = require('koa-passport');
const bcrypt = require('bcrypt');

const { destroySessionsByUserId } = require('../models/sessions');
const { getUser, createUser } = require('../models/user');

const router = new Router({
  prefix: '/auth',
});

router.post('/signup', async (ctx, next) => {
  const user = ctx.request.body;

  if (!user.password || !user.email) {
    ctx.throw(403, 'You must fill out all fields to signup.');
  }

  try {
    const { email } = user;
    const findUser = await getUser({ email });
    if (!findUser) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      const newUserId = await createUser({ ...user, password: hash });

      await passport.authenticate('local', (err, token) => {
        if (token === false) {
          ctx.throw(403, 'Authentication failed.');
        } else {
          ctx.body = {
            status: 'success',
            message: 'User has created',
            user: newUserId[0],
            token,
          };
        }
      })(ctx, next);
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'You have already signed up.' };
    }
  } catch (err) {
    ctx.throw(400, 'Encountered an error');
  }
});

router.post('/login', async (ctx, next) => {
  const user = ctx.request.body;

  if (!user.password || !user.email) {
    ctx.throw(403, 'You must fill out all fields to login.');
  }

  await passport.authenticate('local', (err, token) => {
    if (token === false) {
      ctx.throw(403, 'Authentication failed.');
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
      ctx.throw(401, 'Unauthorized.');
    }
  })(ctx, next);
});

module.exports = router.routes();
