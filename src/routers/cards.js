const express = require("express");
const router = express.Router();

const Card = require("../models/card");

router.post("/create", (req, res) => {
  const u = req.session.username;
  Card.find({ username: u }).then((cards) => {
    numOfCards = cards.length + 1;
    const card = new Card({
      content: req.body.content,
      title: req.body.title,
      footer: req.body.footer,
      image: req.body.image,
      username: req.session.username,
      priority: numOfCards,
    });

    card.save().then(() => res.json(u));
  });
});

router.get("/filter/:id", (req, res) => {
  Card.find({ username: req.params.id })
    .then((cards) => res.json(cards))
    .catch((_) => res.status(400).end());
});

router.patch("/:id", (req, res) => {
  const u = req.session.username;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.username == u) {
        Card.findByIdAndUpdate(req.params.id, req.body)
          .then(() => res.json(u))
          .catch((_) => res.status(400).end());
      } else {
        res.status(400).end();
      }
    })
    .catch((_) => res.status(400).end());
});

router.patch("/", (req, res) => {
  const u = req.session.username;
  const cards = req.body;
  cards.map((card) => {
    if (card.username == u) {
      Card.findByIdAndUpdate(card._id, { priority: card.priority })
        .then((result) => res.json(result))
        .catch((_) => res.status(400).end());
    } else {
      res.status(400).end();
    }
  });
});

router.get("/:id", (req, res) => {
  const u = req.session.username;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.username == u) {
        res.json(card);
      } else {
        res.status(400).end();
      }
    })
    .catch((_) => res.status(400).end());
});

router.delete("/:id", (req, res) => {
  const u = req.session.username;
  Card.findById(req.params.id)
    .then((card) => {
      if (card.username == u) {
        Card.findByIdAndDelete(req.params.id)
          .then(() => res.json(u))
          .catch((_) => res.status(400).end());
      } else {
        res.status(400).end();
      }
    })
    .catch((_) => res.status(400).end());
});

module.exports = router;
