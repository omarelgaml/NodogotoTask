const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const mongoose = require ('mongoose');
const Requet = mongoose.model ('ElderlyRequests');

module.exports = app => {
  app.post ('/api/elderlyRequest', requireLogin, async (req, res) => {
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
  app.get ('/api/getElderlyRequests', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        map.push (request);
      });
      res.send (map);
    });
  });
  app.post ('/api/filterElderlyRequests', requireLogin, async (req, res) => {
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

  app.delete ('/api/deletePost', requireLogin, async (req, res) => {
      const deleted = await Requet.deleteOne({_id:req.body.id});
      console.log(deleted);
      Requet.find ({}, function (err, reqs) {
        var map = [];
  
        reqs.forEach (function (request) {
          map.push (request);
        });
        res.send (map);
      });
  });


  app.post ('/api/elderlyUser', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = [];

      reqs.forEach (function (request) {
        if (request.userID === req.body.id) map.push (request);
      });
      res.send (map);
    });
});
};
