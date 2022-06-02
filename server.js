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


// app.get("/tickets/:documentId", async (req, res) => {
//   const id = req.params.documentId;

//   const options = {
//     method: "GET",
//     headers: {
//       Accepts: "application/json",
//       "X-Cassandra-Token": TOKEN,
//     },
//   };

//   try {
//     const response = await axios(`${URL}/${id}`, options);
//     res.status(200).json(response.data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err });
//   }
// });


// app.put("/tickets/:documentId", async (req, res) => {
//   const id = req.params.documentId;
//   const data = req.body.data;

//   const options = {
//     method: "PUT",
//     headers: {
//       Accepts: "application/json",
//       "X-Cassandra-Token": TOKEN,
//     },
//     data,
//   };

//   try {
//     const response = await axios(`${URL}/${id}`, options);
//     res.status(200).json(response.data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err });
//   }
// });

// app.delete("/tickets/:documentId", async (req, res) => {
//   const id = req.params.documentId;

//   const options = {
//     method: "DELETE",
//     headers: {
//       Accepts: "application/json",
//       "X-Cassandra-Token": TOKEN,
//     },
//   };
//   try {
//     const response = await axios(`${URL}/${id}`, options);
//     res.status(200).json(response.data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err });
//   }
// });

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
