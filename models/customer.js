const db = require('../db');

async function createCustomer(data) {
  return db('customer')
    .insert(data);
}

async function getCustomer(criteria) {
  const customer = await db('customer')
    .select()
    .where(criteria)
    .first()
  return customer;
}

async function update({ criteria, data }) {
    console.log(criteria)
    console.log(data)
  return db('customer')
    .where(criteria)
    .update(data);
}

async function destroyCustomer(criteria) {
  await db('customer')
    .where(criteria)
    .del();
}
module.exports = { createCustomer, getCustomer, update, destroyCustomer };
