require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');

const passport = require('./services/password');
const acl = require('./services/acl');
const router = require('./routes');

const app = new Koa();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.use(async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404, 'Page not found');
    }
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 500) {
      ctx.body = { status: 'error', message: 'Other error' };
    } else {
      ctx.body = { status: 'error', message: err.message };
    }
  }
});

app.use(cors()).use(bodyParser());

app.use(passport.initialize());

app.use(acl.middleware());

app.use(staticFiles('public'));

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => console.log(`Server error ${err}, ${ctx}`));

const server = app.listen(PORT, HOST, () =>
  console.log(`Listen on: ${process.env.HOST}:${process.env.PORT}`)
);

module.exports = server;
