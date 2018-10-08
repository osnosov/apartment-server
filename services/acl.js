const Roles = require('koa-roles');

const acl = new Roles({
  async failureHandler(ctx, action) {
    ctx.status = 403;
    ctx.body = {
      status: 'error',
      message: 'Access Denied',
      action,
    };
  },
});

/* eslint-disable consistent-return */
acl.use('access manager page', async ctx => {
  if (ctx.state.user.role === 'manager') {
    return true;
  }
});

acl.use(async ctx => {
  if (ctx.state.user.role === 'admin') {
    return true;
  }
});
/* eslint-enable consistent-return */

module.exports = acl;
