module.exports = async (req, res) => {
  const schedulers = await req.model.schedulers.pageByUserId({
    userId: req.userId,
  });
  res.json({ schedulers });
};
