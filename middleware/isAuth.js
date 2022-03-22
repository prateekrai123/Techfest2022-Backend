const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("not token");
    return res.status(208).json({ isError: true, message: "Failed" });
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    res.status(208).json({ isError: true, message: "Failed" });
  }

  if (!decodedToken) {
    res.status(208).json({ isError: true, message: "Failed" });
  }
  // if(decodedToken.role==569){

  // }
  req.userId = decodedToken.id;
  next();
};
