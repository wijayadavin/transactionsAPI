const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({
  /**
   * 👇
   * if your team is adding tables,
   * the ifs in the addData() (addController.js)
   * and in editData() (editController.js)
   **/
  menus: [],
  orderItems: [],
  orders: [],
  restaurants: [],
  users: [],
})
    .write();

module.exports = db;
