const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const mongoose = require ('mongoose');
const Requet = mongoose.model ('ElderlyRequests');

module.exports = app => {
  app.post ('/api/elderlyRequest', requireLogin, async (req, res) => {
    const request = await new Requet ({
      text: req.body.text,
      location: req.body.location,
    }).save ();
  });
  app.get ('/api/getElderlyRequests', requireLogin, async (req, res) => {
    Requet.find ({}, function (err, reqs) {
      var map = {};

      reqs.forEach (function (request) {
        map[request._id] = request;
      });
      res.send (map);
    });
  });
  app.post ('/api/filterElderlyRequests', requireLogin, async (req, res) => {
        Requet.find ({}, function (err, reqs) {
                var map = {};
          
                reqs.forEach (function (request) {
                        console.log(request.location+"  "+req.body.location)
                  if(request.location===req.body.location)
                  map[request._id] = request;
                });
                console.log(map)
                res.send (map);
              });
       // const requests = await Requet.findOne({"location":"test"});
        //res.send(requests)

  });
};
