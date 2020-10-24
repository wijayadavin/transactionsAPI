const db = require("../connections/dbConnection");
const shapeObject = require("../helpers/shapeObjectHelper");
const menuModel = require("../models/menuModel");
const orderItemModel = require("../models/orderItemModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");
const userModel = require("../models/userModel");

/**
 * Edit data
 *
 * Usage example:
 *
 *    edit('transaction', "1", { nominal: 4000 })
 *    // 👆 edit data by id "1" to having 4000 nominal
 *
 * @param {String} tableName choose table
 * @param {String} id data id to update
 * @param {Object} data new data to update
 * @return {Object} Returns an `object` if successfully added
 * @return {Boolean} Retuns `false` if id wasn't string,\
 * not found, or data object keys was lacking
 */
function editData(tableName, id, data) {
  if (!id) return false;
  if (typeof id !== "string") return false;
  const searchResult = db.get(tableName).find({ id }).value();
  if (searchResult) {
    let shapedData;
    data.id = id;
    if (tableName == "menus") {
      shapedData = shapeObject(data, menuModel);
    }
    if (tableName == "orderItems") {
      shapedData = shapeObject(data, orderItemModel);
    }
    if (tableName == "orders") {
      shapedData = shapeObject(data, orderModel);
    }
    if (tableName == "restaurants") {
      shapedData = shapeObject(data, restaurantModel);
    }
    if (tableName == "users") {
      shapedData = shapeObject(data, userModel);
    }

    if (!shapedData) return false;

    db.get(tableName).find(id).assign(shapedData).write();

    return data;
  } else {
    return false;
  }
}

module.exports = editData;
