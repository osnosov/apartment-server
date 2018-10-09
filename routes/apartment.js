const Router = require('koa-router');
const passport = require('koa-passport');

const acl = require('../services/acl');
const {
  createApartment,
  getAllApartment,
  getApartment,
  updateApartment,
  destroyApartment,
} = require('../models/apartment');

const router = new Router({
  prefix: '/apartments',
});

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  acl.can('access manager page'),
  async ctx => {
    try {
      const apartments = await getAllApartment();
      ctx.body = {
        status: 'success',
        message: 'get apartments success',
        data: apartments,
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
      const apartment = await getApartment({ id });
      ctx.body = {
        status: 'success',
        message: 'get apartment success',
        data: apartment,
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
    const apartment = ctx.request.body;

    try {
      const createApartmentId = await createApartment(apartment);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        message: 'Apartment has created',
        data: { id: createApartmentId },
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
      const status = await destroyApartment({ id });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Apartment deleted.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Apartment does not exist.' };
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
    const apartment = ctx.request.body;
    try {
      const status = await updateApartment({
        criteria: { id },
        data: apartment,
      });
      if (status) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          message: 'Apartment update.',
        };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'Apartment does not exist.' };
      }
    } catch (err) {
      ctx.throw(400, 'Encountered an error');
    }
  }
);

module.exports = router.routes();
