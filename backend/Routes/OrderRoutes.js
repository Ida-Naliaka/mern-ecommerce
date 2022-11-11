const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} = require("../Controllers/OrderController");
const router = express.Router();

router.route("/").post(createOrder);
router.route("/:id").put(updateOrder);
router.route("/:id").delete(deleteOrder);
router.route("/find/:userId").get(getUserOrders);
router.route("/").get(getAllOrders);
router.route("/income").get(getMonthlyIncome);

module.exports = router;
