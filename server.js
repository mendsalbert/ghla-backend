//watch these next
//!! MERN Stack Front To Back Full Stack React, Redux & Node.js
//!C:\Users\Albert\Downloads\UDEMY COURSES\MERN React Node Next.js Multi User SEO Blogging Platform
const express = require("express");
const app = express();
const path = require("path");
const expressUpload = require("express-fileupload");
const connectDB = require("./config/db");
const cors = require("cors");

//@user related routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
//@product related routes
const bookRoute = require("./routes/book");

//init middleware
app.use(
  cors({
    origin: ["http://localhost:300"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "asset")));
app.use(express.json({ limit: "100mb" }));
//@user router middleware
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

//@product router middleware
app.use("/api/book", bookRoute);

// @home page
app.use("/", (req, res) => {
  res.json({ msg: "home page" });
});

//init database
connectDB()
  .then((success) => {
    console.log(success);
    app.listen("1000");
  })
  .catch((e) => {
    console.log(e);
  });
