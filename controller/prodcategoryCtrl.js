const Category = require("../models/prodcategory");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

//Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const upadtedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(upadtedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a Category
const getaCategory = asyncHandler(async (req, res) => {
  // validateMongoDbId(id)
  try {
    const getcategory = await Category.findById(req.params.id);
    res.json(getcategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all categories
const getallcategories = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Category.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getaCategory,
  getallcategories,
};
