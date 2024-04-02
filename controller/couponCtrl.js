const Coupon = require("../models/coupon");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

//Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all Coupons
const getallCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updateCoupons = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);

    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createCoupon, getallCoupons, updateCoupon, deleteCoupon };
