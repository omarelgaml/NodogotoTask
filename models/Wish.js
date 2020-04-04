const mongoose = require ('mongoose');
const {Schema} = mongoose;

const wishSchema = new Schema ({
  text: String,
  userID: String,
  date: Date,
});

//mongoose.model(<name whcih we want to use>,<the name of the create schema>)
mongoose.model ('wish', wishSchema);
