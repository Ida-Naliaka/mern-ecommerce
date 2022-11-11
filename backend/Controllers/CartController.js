const Cart = require("../Models/CartModel");
const expressAsyncHandler = require("express-async-handler");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");

const router = require("express").Router();

//CREATE
const createCart = expressAsyncHandler(verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
const updateCart = expressAsyncHandler(async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.params.id });
    const arr = findCart.products;
    const found = arr.some((el) => el.product._id === req.body.product._id);
    if (!found) {
      const updatedCart = await Cart.findByIdAndUpdate(
        findCart._id,
        {
          $push: { products: req.body },
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } else {
      const removeProduct = await Cart.findByIdAndUpdate(
        findCart._id,
        {
          $pull: {
            products: { _id: req.body.product._id },
          },
        },
        { new: true }
      );
      const updatedCart = await Cart.findByIdAndUpdate(
        removeProduct._id,
        {
          $push: { products: req.body },
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
const deleteCart = expressAsyncHandler(async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.params.id });
    await Cart.findByIdAndDelete(findCart._id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
const getUserCart = expressAsyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
const getAllCarts = expressAsyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
};
