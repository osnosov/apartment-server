const Router = require('koa-router');
const passport = require('koa-passport');
const bcrypt = require('bcrypt');

const acl = require('../services/acl');
const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  destroyUser,
} = require('../models/user');

const router = new Router({
  prefix: '/users',
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    try {
      const users = await getAllUser();
      const data = users.map(user => ({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        updated_at: user.updated_at,
        created_at: user.created_at,
      }));
      ctx.body = {
        status: 'success',
        message: 'get users success',
        data,
      };
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  ctx => {
    const { user } = ctx.state;
    delete user.password;
    delete user.recoveryToken;
    ctx.body = {
      status: 'success',
      message: 'get user success',
      data: user,
    };
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access user profile'),
  async ctx => {
    const { id } = ctx.params;
    try {
      const user = await getUser({ id });
      delete user.password;
      delete user.recoveryToken;
      ctx.body = {
        status: 'success',
        message: 'get user success',
        data: user,
      };
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access admin page'),
  async ctx => {
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
        user.password = hash;
        const createUserId = await createUser(user);
        ctx.status = 201;
        ctx.body = {
          status: 'success',
          message: 'User has created',
          data: { id: createUserId },
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'You have already signed up.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access admin page'),
  async ctx => {
    const { id } = ctx.params;

    if (id === String(ctx.state.user.id)) {
      ctx.throw(403, 'You can not delete yourself.');
    }

    try {
      const status = await destroyUser({ id });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'User deleted.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'User does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access admin page'),
  async ctx => {
    const { id } = ctx.params;
    const user = ctx.request.body;

    if (id === String(ctx.state.user.id) && user.role !== ctx.state.user.role) {
      ctx.throw(403, 'You can not upgrade your role.');
    }

    try {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
      }

      const status = await updateUser({ criteria: { id }, data: user });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'User update.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'User does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

module.exports = router.routes();
