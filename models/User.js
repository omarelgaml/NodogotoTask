const mongoose = require ('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
  googleId: String,
  name: String,
  emails: [
    {
      type: String,
    },
  ],
  type: String,
});

//mongoose.model(<name whcih we want to use>,<the name of the create schema>)
mongoose.model ('users', userSchema);
