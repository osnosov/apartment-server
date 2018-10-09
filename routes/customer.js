const Router = require('koa-router');
const passport = require('koa-passport');

const acl = require('../services/acl');
const {
  createCustomer,
  getAllCustomer,
  getCustomer,
  updateCustomer,
  destroyCustomer,
} = require('../models/customer');

const router = new Router({
  prefix: '/customers',
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    try {
      const customers = await getAllCustomer();
      ctx.body = {
        status: 'success',
        message: 'get customers success',
        data: customers,
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
      const customer = await getCustomer({ id });
      ctx.body = {
        status: 'success',
        message: 'get customer success',
        data: customer,
      };
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    const customer = ctx.request.body;

    try {
      const createCustomerId = await createCustomer(customer);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'Customer has created',
        data: { id: createCustomerId },
      };
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    const { id } = ctx.params;

    try {
      const status = await destroyCustomer({ id });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Customer deleted.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Customer does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    const { id } = ctx.params;
    const customer = ctx.request.body;
    try {
      const status = await updateCustomer({ criteria: { id }, data: customer });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Customer update.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Customer does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

module.exports = router.routes();
