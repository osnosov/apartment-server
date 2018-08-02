const db = require('../db')

async function migration() {
  await db.schema.dropTableIfExists('users');
  await db.schema.createTable('users', t => {
    t.increments().primary();
    t.string('email')
      .notNullable()
      .unique();
    t.string('username').notNullable();
    t.string('password');
    t.string('recoveryToken');
    t.string('firstName').notNullable();
    t.string('lastName').notNullable();
    t.string('phoneNumber')
      .notNullable()
      .unique();
    t.string('role');
  });

  await db.destroy();
}

migration();
