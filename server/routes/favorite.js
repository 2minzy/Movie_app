const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
const { response } = require('express');

router.post('/favoriteNumber', (req, res) => {
  // Bring favorite number from mongoDB
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // Send num info to front
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post('/favorited', (req, res) => {
  // Bring data(whether i put this movie in favorite list or not) from DB
  // Bring favorite number from mongoDB
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // Send num info to front
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post('/addToFavorite', (req, res) => {
  const favortie = new Favorite(req.body);
  favortie.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post('/getFavoriteMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
