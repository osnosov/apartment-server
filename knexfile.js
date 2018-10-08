module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite',
    },
    useNullAsDefault: true,
    debug: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite',
    },
    useNullAsDefault: true,
    debug: true,
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
