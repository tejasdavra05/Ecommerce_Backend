const mongoose = require("mongoose");
var blogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("BCategory", blogcategorySchema);
