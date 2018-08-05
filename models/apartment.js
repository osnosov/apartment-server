const db = require('../db');

async function createApartment(data) {
  return db('apartment').insert(data);
}

async function getApartment(criteria) {
  const apartment = await db('apartment')
    .select()
    .where(criteria)
    .first();
  return apartment;
}

async function updateApartment({ criteria, data }) {
  return db('apartment')
    .where(criteria)
    .update(data);
}

async function destroyApartment(criteria) {
  await db('apartment')
    .where(criteria)
    .del();
}

module.exports = {
  createApartment,
  getApartment,
  updateApartment,
  destroyApartment,
};
