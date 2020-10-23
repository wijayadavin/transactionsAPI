const db = require("../connections/dbConnection")

/**
 * Get data from database
 * 
 * Usage example:
 * 
 *    get('transaction', { })
 *    // 👆 get all
 *    get('transaction', { id: "1" })
 *     // 👆 { removeById, removeByQuery }
 *    get('transaction', { nominal: 40000 })
 *    // 👆 get many based on value
 * 
 * @param {String} tableName choose table
 * @param {Object} query data structure to search
 * @returns {Array} Retuns an `array` of `objects`
 * @returns {undefined} Returns `undefined` if nothing found
 */
function getData(tableName, query) {
  // ⚠️ do not remove the cloneDeep() method ⚠️
  // due to the nature of Javascript, if you don't
  // use cloneDeep() the result variable will be referenced
  // deep to the NodeJs memory, in short, it will cause a nasty bug!
  const result = db.get(tableName)
    .filter(query)
    .cloneDeep()
    .value()
  return result
}
module.exports = getData