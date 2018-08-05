const db = require('../db');

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

  await db.schema.dropTableIfExists('sessions');
  await db.schema.createTable('sessions', t => {
    t.increments().primary();
    t.integer('userId');
    t.foreign('userId').references('users.id');
  });

  await db.schema.dropTableIfExists('customer');
  await db.schema.createTable('customer', t => {
    t.increments().primary();
    t.string('firstName').notNullable();
    t.string('lastName').notNullable();
    t.string('phoneNumber')
      .unique();
    t.string('email')
      .unique();
  });

  await db.destroy();
}

migration();
