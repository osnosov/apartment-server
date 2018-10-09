const db = require('../db');

async function createCustomer(data) {
  const [id] = await db('customer').insert(data);
  return id;
}

async function getAllCustomer() {
  const customers = await db('customer').select();
  return customers;
}

async function getCustomer(criteria) {
  const customer = await db('customer')
    .select()
    .where(criteria)
    .first();
  return customer;
}

async function updateCustomer({ criteria, data }) {
  const status = await db('customer')
    .where(criteria)
    .update(data);
  return status;
}

async function destroyCustomer(criteria) {
  const status = await db('customer')
    .where(criteria)
    .del();
  return status;
}

module.exports = {
  createCustomer,
  getAllCustomer,
  getCustomer,
  updateCustomer,
  destroyCustomer,
};
