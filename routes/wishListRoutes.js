const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const mongoose = require ('mongoose');
const Requet = mongoose.model ('wish');

module.exports = app => {
  app.post ('/api/postWish', requireLogin, async (req, res) => {
    const request = await new Requet ({
      text: req.body.text,
      date: req.body.date,
      userID: req.body.userID,
    }).save ();
    res.send (request);
  });
  app.post ('/api/getWishes', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (wish) {
        if (wish.userID === req.body.id) map.push (wish);
      });
      res.send (map);
    });
  });

  app.delete ('/api/deleteWish', requireLogin, async (req, res) => {
    const deleted = await Requet.deleteOne ({_id: req.body.id});
    console.log (deleted);
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        map.push (request);
      });
      res.send (map);
    });
  });
};
