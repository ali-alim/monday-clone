const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const jwt = require('jsonwebtoken');
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));


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


app.listen(process.env.PORT, () => {
  console.log("server runs on port: " + process.env.PORT);
});
