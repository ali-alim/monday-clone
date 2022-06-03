const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

mongoose.connect(
  process.env.MONGO_URI,
  () => console.log("Database is connected"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// express.json should be above cors()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/tickets", require('./routes/tickets'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.send("Api running");
  });
}

app.listen(process.env.PORT, () => {
  console.log("server runs on port: " + process.env.PORT);
});
