const test = require('ava');
const supertest = require('supertest');

const app = require('./../index.js');

const request = supertest(app);

test('Get 404 on undefined endpoint', async t => {
  const res = await request.get('/404');
  t.is(res.body.status, 'error');
  t.is(res.statusCode, 404);
  t.is(res.body.status, 'error');
  t.is(res.body.message, 'Page not found');
  t.pass();
});
