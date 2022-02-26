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
const error404 = require("./controllers/error404");

require("dotenv").config();

const app = express();
app.use(cors());

//set
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // application/json

=======
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
>>>>>>> d6b2f7565f9db5f2b89829131b1e0feb8a60f992
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/profile", express.static("upload/images"));

//router  api.techfestsliet.com..
app.use("/domain", domain);
app.use("/coordinator", coordinator);
app.use("/workshop", workshop);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome! u have unlocked dev mode");
});

app.use(error404.get404);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
