module.exports = (req, res) => {
  console.log(req.model);
  res.json({ success: true });
};
