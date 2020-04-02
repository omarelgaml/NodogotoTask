const keys = require ('../config/keys');
const requireLogin = require ('../middlewares/requireLogin');
const nodemailer = require ('nodemailer');

module.exports = app => {
  app.post ('/api/sendEmail', requireLogin, (req, res) => {
    var transporter = nodemailer.createTransport ({
      service: 'gmail',
      auth: {
        user: 'quarantinebuddy20@gmail.com',
        pass: '#a123456',
      },
    });

    var mailOptions = {
      from: 'quarantinebuddy20@gmail.com',
      to: 'omarelgaml97@gmail.com',
      subject: 'this email is sent from nodeJS, I am a hacker now',
      text: req.body.post,
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
