export default class {
  constructor(pool) {
    this.pool = pool;
  }

  /**
   * DB Query Method
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  // Adapted from https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
  query(text, params) {
    return new Promise((resolve, reject) => {
      this.pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
 * Create Orders Table
 */
  createOrdersTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      orders(
        orderId SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL,
        name VARCHAR(128) NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        genre VARCHAR(64),
        status VARCHAR(64),
        created_at TIMESTAMP default NOW(),
        modified_at TIMESTAMP default NOW(),
        FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
      )`;
    this.pool.query(queryText)
      .then((res) => {
        console.log('created orders table!: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Delete Orders Tables
   */
  dropOrdersTables() {
    const queryText = 'DROP TABLE IF EXISTS orders';
    this.pool.query(queryText)
      .then((res) => {
        console.log('dropped orders table', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
 * Create Users Table
 */
  createUsersTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          userId SERIAL PRIMARY KEY,
          username VARCHAR(128) UNIQUE NOT NULL,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          address TEXT,
          phone VARCHAR(16),
          role VARCHAR(16) default 'user',
          created_date TIMESTAMP default NOW(),
          modified_date TIMESTAMP default NOW()
        )`;

    this.pool.query(queryText)
      .then(res => console.log('created users table!', res))
      .catch(err => console.log('err in creating users table', err));
  }

  /**
   * Delete Users Tables
   */
  dropUsersTable() {
    const queryText = 'DROP TABLE IF EXISTS users';
    this.pool.query(queryText)
      .then(() => {
        console.log('dropped users table');
      })
      .catch((err) => {
        console.log('err in dropping users table', err);
      });
  }

  /**
 * Create Users Table
 */
  createMenuTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      menu(
        menuId SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        price INTEGER NOT NULL,
        genre VARCHAR(16) NOT NULL,
        img TEXT,
        isAvailable BOOLEAN,
        created_date TIMESTAMP DEFAULT NOW(),
        modified_date TIMESTAMP DEFAULT NOW()
      )`;

    this.pool.query(queryText)
      .then(res => console.log('created users table!', res))
      .catch(err => console.log('err in creating users table', err));
  }

  /**
 * Delete Users Tables
 */
  dropMenuTable() {
    const queryText = 'DROP TABLE IF EXISTS menu';
    this.pool.query(queryText)
      .then(() => {
        console.log('dropped menu table');
      })
      .catch((err) => {
        console.log('err in dropping menu table', err);
      });
  }

  alterTableColumn(tableName, oldCol, newCol) {
    const query = `ALTER TABLE ${tableName} RENAME COLUMN ${oldCol} TO ${newCol}`;
    this.pool.query(query)
      .then(() => {
        console.log(`altered  ${tableName}`);
      })
      .catch((err) => {
        console.log(`err in altering  ${tableName}`, err);
      });
  }
}