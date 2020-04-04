const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const nodemailer = require ('nodemailer');
const mongoose = require ('mongoose');

const User = mongoose.model ('users');

module.exports = app => {
  app.post ('/api/sendEmail', requireLogin, async (req, res) => {
    console.log (req.body);
    const writer = await User.findOne ({_id: req.body.writerID});
    const writerEmail = writer.emails[0];
    var transporter = nodemailer.createTransport ({
      service: 'gmail',
      auth: {
        user: 'quarantinebuddy20@gmail.com',
        pass: '#a123456',
      },
    });

    var mailOptions = {
      from: 'quarantinebuddy20@gmail.com',
      to: writerEmail,
      subject: req.body.userName +
        ' has replied to your post on quarantine buddy',
      text: req.body.text +
        '\n' +
        req.body.userName +
        "'s email is : " +
        writerEmail,
    };

    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        console.log (error);
      } else {
        console.log ('Email sent: ' + info.response);
      }
    });
  });
};
