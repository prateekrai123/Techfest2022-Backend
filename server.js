require("./database/database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4000;
//routes import
const domain = require("./routes/domain");
const coordinator = require("./routes/coordinator");
const workshop = require("./routes/workshop");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const teamRoutes = require("./routes/team");
const error404 = require("./controllers/error404");

require("dotenv").config();

const app = express();

//set
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
app.use(express.static("public"));

const data = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(data));
app.set("view engine", "ejs");

app.use("/profile", express.static("upload/images"));

//router  api.techfestsliet.com..
app.use("/domain", domain);
app.use("/coordinator", coordinator);
app.use("/workshop", workshop);
app.use("/", authRoutes);
app.use("/event", eventRoutes);
app.use("/team", teamRoutes);

app.get("/", (req, res) => {
  res.send("Welcome! u have unlocked dev mode");
});

app.use(error404.get404);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
