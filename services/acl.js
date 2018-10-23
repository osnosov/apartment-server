const Roles = require('koa-roles');

const acl = new Roles({
  async failureHandler(ctx, action) {
    ctx.throw(403, `Access forbidden for: ${action}`);
  },
});

/* eslint-disable consistent-return */
acl.use('access user profile', async ctx => {
  if (
    ctx.params.id === String(ctx.state.user.id) ||
    ctx.state.user.role === 'manager'
  ) {
    return true;
  }
});

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
