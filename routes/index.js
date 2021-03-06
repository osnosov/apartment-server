const Router = require('koa-router');

const auth = require('./auth');
const user = require('./user');
const type = require('./type');
const customer = require('./customer');
const apartment = require('./apartment');

const router = new Router();

router.use(auth);
router.use(user);
router.use(type);
router.use(customer);
router.use(apartment);

module.exports = router;
