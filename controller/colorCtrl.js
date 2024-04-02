const Color = require("../models/color");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

//Create Color
const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Color
const updateColor = asyncHandler(async (req, res) => {
  try {
    const upadtedColor = await Color.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(upadtedColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const color = await Color.findByIdAndDelete(id);
    res.json(color);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a Color
const getaColor = asyncHandler(async (req, res) => {
  // validateMongoDbId(id)
  try {
    const getColor = await Color.findById(req.params.id);
    res.json(getColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All Colors
const getallColors = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Color.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getaColor,
  getallColors,
};
