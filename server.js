//watch these next
//!! MERN Stack Front To Back Full Stack React, Redux & Node.js
//!C:\Users\Albert\Downloads\UDEMY COURSES\MERN React Node Next.js Multi User SEO Blogging Platform
const express = require("express");
const app = express();
const path = require("path");
const expressUpload = require("express-fileupload");
const connectDB = require("./config/db");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");
const Vonage = require("@vonage/server-sdk");
//@user related routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
//@product related routes
const bookRoute = require("./routes/book");

const vonage = new Vonage({
  apiKey: "3d4e80f5",
  apiSecret: "3PKgnHqncyFpha5M",
});
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

const sendSMS = (contact) => {
  str = contact.substring(1);
  const from = "Vonage APIs";
  const to = "233" + str;
  console.log(to);
  const text = "Your book has expired return it for renewal";

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};
//send message
const sendSMSHandler = () => {
  axios
    .get("http://localhost:1000/api/book/all-books-overdue")
    .then((response) => {
      console.log(
        response.data.map((user) => {
          if (user.user.length <= 0) {
            return;
          }
          user.user.map((overdueuser) => {
            if (overdueuser.usertype === "adult") {
              console.log(overdueuser.contact);
              sendSMS(overdueuser.contact);
            } else if (overdueuser.usertype === "children") {
              sendSMS(overdueuser.firstguardiancontact);
              sendSMS(overdueuser.secondguardiancontact);
              console.log(overdueuser.firstguardiancontact);
            }
          });
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
//init database
connectDB()
  .then((success) => {
    console.log(success);
    app.listen("1000");
    // 0 0 */3 * * send message every 3 days
    const task = cron.schedule("1 * * * * *", function () {
      // sendSMSHandler();
    });

    task.start();

    //******************** */
  })
  .catch((e) => {
    console.log(e);
  });
