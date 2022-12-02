const express = require("express");
const path = require("path");
//var fileupload = require("express-fileupload");
const app = express();
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const history = require("connect-history-api-fallback")
const port = process.env.PORT || 4000; // to run server on available port or 4000
//var bodyParser = require("body-parser");
require("./db/conn"); // connecting mongoDb
const UserDetails = require("./models/signUpDetails"); // importing data Schema
const SellerDetails = require("./models/postRestaurant");

//middlewares
app.use(cors());
app.use(express.json()); // to parse the json and use it
app.use(express.urlencoded({ extended: true }));
//app.use(fileupload());
router.use(express.static(__dirname + "./uploads/"));
app.use(express.static(path.resolve(__dirname, '../dist'),{maxAge:'1y' , etag:false}));
app.use(history());

var Storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: Storage,
}).single("file");

app.get("/", async (req, res) => {
  res.send("hello this is backend ");
});

// SignUp POST

app.post("/api/signup", async (req, res) => {
  //console.log(req.body)
  try {
    console.log(req.body);
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;
    const name = req.body.name;
    console.log(password);
    console.log(name);

    if (password === cpassword) {
      const addingNewUser = new UserDetails({
        name: req.body.name,
        email: req.body.email,
        password: password,
        confirmPassword: cpassword,
      });
      console.log("inside :", name);

      const insertData = await addingNewUser.save();
      res.status(201).send(insertData);
    } else {
      res.send("password does not match");
    }
  } catch (e) {
    res.status(400).send(e);
    console.log("error");
  }
});

// Login POST

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await UserDetails.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(201).send(userEmail);
    } else {
      res.send("email or password is not matching");
    }
  } catch (e) {
    res.send(400).send("Invalid email or password");
  }
});

//Admin LOGIN
app.post("/api/adminlogin", async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await SellerDetails.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(201).send(userEmail);
    } else {
      res.send("email or password is not matching");
    }
  } catch (e) {
    res.status(400).send("Invalid email or password");
  }
});

// Restaurant Details POST

app.post("/api/newRestaurant", upload, async (req, res) => {
  console.log(req.body);
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;
    const file = req.file.filename;
    console.log("image:", file);
    const email = req.body.email;
    const userEmail = await SellerDetails.findOne({ email: email });

    if (userEmail) {
      res.send("Email already registered!");
    } else {
      if (password === cpassword) {
        const addingNewRestaurant = new SellerDetails({
          restaurantName: req.body.restaurantName,
          email: email,
          phoneNo: req.body.phoneNo,
          aptName: req.body.aptName,
          street: req.body.street,
          locality: req.body.locality,
          state: req.body.state,
          zip: req.body.zip,
          file: req.file.filename,
          description:req.body.description,
          password: password,
          confirmPassword: cpassword,
        });
        console.log(email);
        const insertData = await addingNewRestaurant.save();
        res.status(201).redirect("/");
      } else {
        res.send("password does not match");
      }
    }
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

app.get("/api/newRestaurant", async (req, res) => {
  try {
    const getData = await SellerDetails.find({});
    res.status(200).send(getData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//to get signup
app.get("/api/signup", async (req, res) => {
  try {
    const getData = await UserDetails.find({});
    res.status(200).send(getData);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/api/login", async (req, res) => {
  try {
    const getData = await UserDetails.find({});
    res.status(201).send(getData);
  } catch (e) {
    res.status(404).send(e);
  }
});

// app.get("/api/adminlogin", async (req, res) => {
//   try {
//     const getData = await SellerDetails.find({});
//     res.status(201).send(getData);
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(port, () => {
  console.log(`The server is listining at ${port}`);
});
