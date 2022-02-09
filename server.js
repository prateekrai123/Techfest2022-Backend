require("./database/database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
app.use(cors());

//set
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/profile", express.static("upload/images"));

//router  at /api/..
app.use("/", authRoutes);

app.use("/", (req, res) => {
  res.send("Welcome! u have unlocked dev mode");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
