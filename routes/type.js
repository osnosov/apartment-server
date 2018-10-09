const Router = require('koa-router');
const passport = require('koa-passport');

const acl = require('../services/acl');
const {
  createType,
  getAllType,
  getType,
  updateType,
  destroyType,
} = require('../models/type');

const router = new Router({
  prefix: '/types',
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    try {
      const types = await getAllType();
      ctx.body = {
        status: 'success',
        message: 'get types success',
        data: types,
      };
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    const { id } = ctx.params;
    try {
      const type = await getType({ id });
      ctx.body = {
        status: 'success',
        message: 'get type success',
        data: type,
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
    const type = ctx.request.body;

    if (!type.name) {
      ctx.throw(403, 'You must fill out all fields.');
    }

    try {
      const createTypeId = await createType(type);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'Type has created',
        data: { id: createTypeId },
      };
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

    try {
      const status = await destroyType({ id });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Type deleted.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Type does not exist.' };
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
    const type = ctx.request.body;
    try {
      const status = await updateType({ criteria: { id }, data: type });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Type update.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Type does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

module.exports = router.routes();
