const Product = require("../models/product");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//Create Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a Product
const getaPoduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All Products
const getallProduct = asyncHandler(async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    if (queryStr === "{}") {
      // If queryStr is empty, set it to an empty object to avoid MongoDB errors
      queryStr = "{}";
    }
    let query = Product.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting the fields
    try {
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        // console.log("Selected fields:", fields);
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
    } catch (error) {
      console.log(error);
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exists");
    }
    console.log(page, limit, skip);

    const product = await query;
    //Product.find(req.query);

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.params);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    console.log(req.body);
    const upadteproduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    console.log(req.body);

    res.json(upadteproduct);
  } catch (error) {}
});

//Delete Product
const deleteaProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//Wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Ratings
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      // res.json(updateRating)
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      // res.json(rateProduct)
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaPoduct,
  getallProduct,
  updateProduct,
  deleteaProduct,
  addToWishlist,
  rating,
};
