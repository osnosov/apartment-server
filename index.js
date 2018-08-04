require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');

const passport = require('./services/password');
const router = require('./routes');

const app = new Koa();

app.use(cors()).use(bodyParser());

app.use(passport.initialize());

app.use(staticFiles('public'));

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => console.log(`Server error ${err}, ${ctx}`));

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT || ''}`)
);
