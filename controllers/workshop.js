exports.getWorkshop = (req, res) => {
  const { a, b } = req.query;
  console.log(req.params);
  res.json({ message: "good", a, b });
};

exports.createWorkshop = (req, res) => {
  const wsName = req.body.wsName;
  console.log(wsName);
};

exports.createFiles = (req, res) => {
  //   const wsName = req.body.wsName;
  console.log(req.body);
};

exports.getFile = (req, res) => {
  res.render("elo");
};
