const mongoose = require ('mongoose');
const {Schema} = mongoose;

const eldReq = new Schema ({
  text: String,
  name: String,
  location: String,
  date: Date,
  emails: [
    {
      type: String,
    },
  ],
});

//mongoose.model(<name whcih we want to use>,<the name of the create schema>)
mongoose.model ('ElderlyRequests', eldReq);
