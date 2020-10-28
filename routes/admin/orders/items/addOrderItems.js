const express = require('express');
const addData = require('../../../../controllers/addController');
const getData = require('../../../../controllers/getController');
const uid = require('uid');
const auth = require('../../../../middlewares/jwtMiddleware');
const permissionHelper = require('../../../../helpers/permissionHelper');
const router = express.Router();

router.post('/admin/orders/items'), permissionHelper(['admin']), (req, res) => {
  // Firstly, let's check if order ID is available:
  const foundOrder = getData(
      'orders',
      {id: req.body.orderID});

  // Secondly, let's check if menu ID is available:
  const foundMenu = getData(
      'menus',
      {id: req.body.menuID});

  // Thirdly, return error if error happened:
  if (!foundOrder[0] && ! foundMenu[0]) {
    return res.status(404).send('Invalid order ID & menu ID');
  };
  if (!foundOrder[0]) {
    return res.status(404).send('Invalid order ID');
  };
  if (!foundMenu[0]) {
    return res.status(404).send('Invalid menu ID');
  };

  // If ok, continue:
  req.body.id = uid();
  const result = addData('orderItems', req.body);

  if (!result) {
    res.status(400).send('Wrong body');
  } else {
    res.send(result);
  }
  return;
};

module.exports = router;
