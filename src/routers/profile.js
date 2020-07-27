const express = require("express");
const router = express.Router();

const Profile = require("../models/profile");
const { default: Axios } = require("axios");

router.post("/create", (req, res) => {
  const profile = new Profile({
    content: "Say something about yourself, try editing this text!",
    theme: false,
    username: req.body.username,
  });
  profile
    .save()
    .then((port) => res.json(port))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  Profile.find({ username: req.session.username })
    .then((profile) => {
      if (profile.length == 0) {
        Axios.post(
          `http://${req.hostname}:5000/profile/create`,
          { username: req.session.username },
          { withCredentials: true }
        )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        res.json(profile);
      }
    })
    .catch((_) => res.status(400).end());
});

router.get("/about", (req, res) => {
  Profile.find({ username: req.session.username })
    .then((profile) => res.json(profile))
    .catch((err) => res.json(err));
});

router.patch("/", (req, res) => {
  Profile.findOneAndUpdate({ username: req.session.username }, req.body)
    .then((port) => res.json(port))
    .then((err) => res.json(err));
});
module.exports = router;
