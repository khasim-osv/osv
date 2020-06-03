const mongoose = require("mongoose");

const CategoryMasterSchema = mongoose.Schema({
  /*  _id: {
    type: String,
//    required: false,
  },*/
  categoryName: {
    type: String,
    required: true
  }
});

const CategoriesModel = mongoose.model(
  "CategoryMaster",
  CategoryMasterSchema,
  "CategoryMaster"
);
module.exports = CategoriesModel;
