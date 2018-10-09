const db = require('../db');

async function createSession(userId) {
  const [id] = await db('sessions').insert({ userId });
  console.log(id);
  return id;
}

async function getSession(criteria) {
  const sessions = await db('sessions')
    .select()
    .where(criteria)
    .first();
  return sessions;
}

async function destroySessionsByUserId(criteria) {
  const status = await db('sessions')
    .where(criteria)
    .del();
  return status;
}

module.exports = { createSession, getSession, destroySessionsByUserId };
