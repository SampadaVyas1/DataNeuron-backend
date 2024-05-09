// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (or your chosen database)
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.z1a9ssq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  //   { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// // Define Schema for your data
const entrySchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Define Model
const Entry = mongoose.model("entry", entrySchema);

// async function insert() {
//   await Entry.create({
//     name: "sandepe",
//     age: 54,
//   });
// }
// insert();
// Routes
app.post("/api/add", async (req, res) => {
  try {
    console.log(req);
    await Entry.create(req.body);
    console.log(await Entry.create(req.body));

    res.status(201).send("Entry added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding entry");
  }
});

app.put("/api/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the entry by ID and update it
    await Entry.findByIdAndUpdate(id, req.body);
    res.status(200).send("Entry updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating entry");
  }
});

// Counter for tracking API calls
let addCount = 0;
let updateCount = 0;

app.get("/api/count", async (req, res) => {
  const result = await Entry.find();
  console.log("received", result);
  return res.send(result);
});

app.post("/api/add", (req, res) => {
  console.log(req);
  addCount++;
  res.json({ addCount });
});

app.put("/api/update/:id", (req, res) => {
  updateCount++;
  res.json({ updateCount });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
