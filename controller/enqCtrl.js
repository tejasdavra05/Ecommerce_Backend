const Enquiry = require("../models/enq");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");

//Create Enquiry
const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Enquiry
const updateEnquiry = asyncHandler(async (req, res) => {
  try {
    const upadtedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(upadtedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete Enquiry
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const enquiry = await Enquiry.findByIdAndDelete(id);
    res.json(enquiry);
  } catch (error) {
    throw new Error(error);
  }
});

//Get an Enquiry
const getaEnquiry = asyncHandler(async (req, res) => {
  // validateMongoDbId(id)
  try {
    const getEnquiry = await Enquiry.findById(req.params.id);
    res.json(getEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All Enquiries
const getallEnquirys = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Enquiry.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getaEnquiry,
  getallEnquirys,
};
