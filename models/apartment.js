const db = require('../db');

async function createApartment(data) {
  const id = await db('apartment').insert(data);
  return id;
}

async function getAllApartment() {
  const apartments = await db('apartment').select();
  return apartments;
}

async function getApartment(criteria) {
  const apartment = await db('apartment')
    .select()
    .where(criteria)
    .first();
  return apartment;
}

async function updateApartment({ criteria, data }) {
  const status = await db('apartment')
    .where(criteria)
    .update(data);
  return status;
}

async function destroyApartment(criteria) {
  const status = await db('apartment')
    .where(criteria)
    .del();
  return status;
}

module.exports = {
  createApartment,
  getAllApartment,
  getApartment,
  updateApartment,
  destroyApartment,
};
