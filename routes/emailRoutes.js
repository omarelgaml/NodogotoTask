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
        user: keys.email,
        pass: keys.password,
      },
    });

    var mailOptions = {
      from: keys.email,
      to: writerEmail,
      subject: req.body.userName +
        ' has replied to your post on quarantine buddy',
      text: req.body.text +
        '\n' +
        req.body.userName +
        "'s email is : " +
        req.body.email,
    };

    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        console.log (error);
        res.send(error)
      } else {
        console.log ('Email sent: ' + info.response);
        res.send(info.response);
      }
    });
    
  });
};
