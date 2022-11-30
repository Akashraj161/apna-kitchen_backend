const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantDetails = new mongoose.Schema({
  restaurantName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  aptName: {
    type: String,
  },
  street: {
    type: String,
  },
  locality: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  // formattedAddress: {
  //   type: String,
  //   required: true,
  // },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  file: {
    type: String,
  },
  description: {
    type: String,
  },
  // address: addressInfo,
  items: [{ type: Schema.Types.ObjectId, ref: "newFoodDetail" }],
});


const newRestaurantDetail = new mongoose.model("newRestaurantDetail",restaurantDetails);
module.exports = newRestaurantDetail;
