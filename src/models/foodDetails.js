const mongoose = require("mongoose");

const foodDetail = new mongoose.Schema({
  name: {
    type: String,
  },
  description:{
    type:String,
  },
  price:{
    type:Number,
  },
  image:{
    type:String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "newRestaurantDetail",
    required: true,
  },
  
});

const newFoodDetail = new mongoose.model("newFoodDetail",foodDetail);
module.exports = newFoodDetail;
