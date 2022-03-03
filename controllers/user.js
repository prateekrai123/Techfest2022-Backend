module.exports.pushEvent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { event } = req.body;

  const user = await User.findOne({ userId: req.user.userId });

  user.events.push(event);

  await user.save();

  return res.status(200).json(successAction("Event is added"));
};

module.exports.pushWorkshop = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { workshop } = req.body;

  const user = await User.findOne({ userId: req.user.userId });

  user.workshops.push(workshop);

  await user.save();

  return res.status(200).json(successAction("Workshop is added"));
};
