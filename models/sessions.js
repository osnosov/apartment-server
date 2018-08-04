const db = require('../db');

async function createSession(userId) {
  return db('sessions')
    .insert({ userId })
    .then(([id]) => id);
}

async function getSession(criteria) {
  const sessions = await db('sessions')
    .select()
    .where(criteria)
    .first();
  return sessions;
}

async function destroySessionsByUserId(userId) {
  await db('sessions')
    .where({ userId })
    .del();
}

module.exports = { createSession, getSession, destroySessionsByUserId };
