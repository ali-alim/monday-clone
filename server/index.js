const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const User = require("./models/User");
const jwt = require('jsonwebtoken');

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

app.use("/api/tickets", require("./routes/tickets"));

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
   const token = jwt.sign({
     name: user.name,
     email: user.email
   },
   'secret123'
   )
   return res.json({status:'ok', user: token}) 
  } else {
    return res.json({ status: "error", user: false });
  }
});

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
