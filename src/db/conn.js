const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://root:root@cluster0.ug3lcfu.mongodb.net/UserDetailsSignUp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true,
    // useFindAndModify:false
  })
  // .connect("mongodb://localhost:27017/UserDetailsSignUp", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  .then(() => {
    console.log("Connection has been established");
  })
  .catch((e) => {
    console.log(e);
    console.log("Connection Lost");
  });
