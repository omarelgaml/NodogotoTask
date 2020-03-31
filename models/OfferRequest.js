const mongoose = require ('mongoose');
const {Schema} = mongoose;

const offerReq = new Schema ({
  text: String,
  location:String,
});

//mongoose.model(<name whcih we want to use>,<the name of the create schema>)
mongoose.model ('OfferRequests', offerReq);
