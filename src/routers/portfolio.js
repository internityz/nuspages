const express = require("express");
const router = express.Router();
const markdownpdf = require("markdown-pdf");
const fs = require("fs");

const Portfolio = require("../models/portfolio");
const { default: Axios } = require("axios");

router.get("/", (req, res) => {
  Portfolio.findOne({ username: req.session.username })
    .then((port) => res.json(port))
    .catch((_) => res.status(400).end());
});

router.post("/create", (req, res) => {
  const portfolio = new Portfolio({
    md: req.body.md,
    username: req.body.username,
  });

  portfolio
    .save()
    .then((port) => res.json(port))
    .catch(() => res.status(400).end());
});

router.patch("/", (req, res) => {
  Portfolio.findOneAndUpdate(
    { username: req.session.username },
    { md: req.body.md }
  )
    .then((port) => {
      if (port == null) {
        Axios.post(
          `http://${req.hostname}:5000/portfolio/create`,
          { ...req.body, username: req.session.username },
          { withCredentials: true }
        );
      } else {
        res.json("Updated");
      }
    })
    .then(() => res.end());
});

router.post("/", (req, res) => {
  const { md } = req.body;
  markdownpdf({ paperFormat: "A5" })
    .from.string(md)
    .to.buffer({}, (error, buf) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.set({
        "Content-Disposition": "attachment; filename=portfolio.pdf",
        "Content-Type": "application/pdf",
      });

      res.send(buf);
    });
});

module.exports = router;
