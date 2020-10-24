const db = require('../connections/dbConnection');

/**
 * Remove data from database based on value
 *
 * Usage example
 *
 *    removeByQuery('transaction', { nominal: 3000 })
 *    // 👆 remove many based on nominal
 *
 * @param {String} tableName choose table
 * @param {String} query data structure to search to delete
 * @return {Boolean} return `true` if data was found and deleted
 * or `false` if data was not found
 */
function removeDataByQuery(tableName, query) {
  const searchResult = db.get(tableName)
      .find(query)
      .value();
  if (searchResult) {
    db.get(tableName)
        .remove(query)
        .write();
    return true;
  } else {
    return false;
  }
}


/**
 * Remove data from database based on id
 *
 * Usage example:
 *
 *    removeById('transaction', "1")
 *
 * @param {String} tableName choose table
 * @param {String} id data id to delete
 * @return {Boolean} return `true` if data was found and deleted
 * or `false` if data was not found
 */
function removeDataById(tableName, id) {
  const searchResult = db.get(tableName)
      .find({id})
      .value();
  if (searchResult) {
    db.get(tableName)
        .remove({id})
        .write();
    return true;
  } else {
    return false;
  }
}

const remove = {removeDataById, removeDataByQuery};

module.exports = remove;
