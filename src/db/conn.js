const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://root:root@cluster0.ug3lcfu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection has been established");
  })
  .catch((e) => {
    console.log("Connection Lost");
  });
