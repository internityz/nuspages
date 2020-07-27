const express = require("express");
const router = express.Router();

router.get("/check-session", (req, res) => {
  if (req.session && req.session.username) res.end(req.session.username);
  res.status(204).end();
});

router.post("/login", (req, res) => {
  const u = req.body.username;
  req.session.username = u;
  res.redirect(`http://${req.hostname}:3000/user/${u}`);
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect(`http://${req.hostname}:3000`);
});

module.exports = router;
