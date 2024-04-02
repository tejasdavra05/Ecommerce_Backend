const Brand = require("../models/brand");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

//Create Brand
const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Brand
const updateBrand = asyncHandler(async (req, res) => {
  try {
    const upadtedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(upadtedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const brand = await Brand.findByIdAndDelete(id);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a Brand
const getaBrand = asyncHandler(async (req, res) => {
  try {
    const getBrand = await Brand.findById(req.params.id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all Brands
const getallbrands = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Brand.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getaBrand,
  getallbrands,
};
