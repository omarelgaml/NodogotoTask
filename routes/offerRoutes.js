const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const mongoose = require ('mongoose');
const Requet = mongoose.model ('OfferRequests');

module.exports = app => {
  app.post ('/api/offerRequest', requireLogin, async (req, res) => {
    const request = await new Requet ({
      text: req.body.text,
      location: req.body.location,
      name: req.body.name,
      date: req.body.date,
      emails: req.body.emails,
      userID: req.body.userID,
    }).save ();
    res.send (request);
  });
  app.get ('/api/getOfferRequests', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        map.push (request);
      });
      res.send (map);
    });
  });
  app.post ('/api/filterOfferRequests', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        if (request.location === req.body.location) map.push (request);
      });
      res.send (map);
    });
    // const requests = await Requet.findOne({"location":"test"});
    //res.send(requests)
  });

  app.delete ('/api/deleteOfferPost', requireLogin, async (req, res) => {
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

  app.post ('/api/offerUser', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        if (request.userID === req.body.id) map.push (request);
      });
      res.send (map);
    });
  });
};
