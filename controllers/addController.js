const db = require('../connections/dbConnection');
const shapeObject = require('../helpers/shapeObjectHelper');
const menuModel = require('../models/menuModel');
const orderItemModel = require('../models/orderItemModel');
const orderModel = require('../models/orderModel');
const restaurantModel = require('../models/restaurantModel');
const userModel = require('../models/userModel');


/**
 * Add data to database
 *
 * Usage example:
 *
 *    add('transaction', { id: "1", nominal: 3000 })
 *    // 👆 add data by id "1" and nominal 3000
 *
 * @param {String} tableName choose table
 * @param {Object} data data to insert
 * @return {Object} Returns an `object` if successfully added
 * @return {Boolean} Retuns `false` if id wasn't string,\
 * not found, or data object keys was lacking
 */
function addData(tableName, data) {
  // if you only have one line code inside an if
  // you can shorten it like this 👇
  if (!data.id) return false;
  if (typeof data.id !== 'string') return false;

  let shapedData;
  if (tableName == 'menus') {
    shapedData = shapeObject(data, menuModel);
  }
  if (tableName == 'orderItems') {
    shapedData = shapeObject(data, orderItemModel);
  }
  if (tableName == 'orders') {
    shapedData = shapeObject(data, orderModel);
  }
  if (tableName == 'restaurants') {
    shapedData = shapeObject(data, restaurantModel);
  }
  if (tableName == 'users') {
    shapedData = shapeObject(data, userModel);
  }

  if (!shapedData) return false;

  db.get(tableName)
      .push(shapedData)
      .write();
  return data;
}


module.exports = addData;
