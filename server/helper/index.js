var nodemailer = require("nodemailer");

exports.sendMail = ( to, subject, text) => {

    // Only needed if you don't have a real mail account for testing
   /* let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });  */

    

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testosv.222@gmail.com",
      pass: "Testmail@222",
    },
  });

 // var mailOptions = { from: "testosv.222@gmail.com", to, subject, text };
  var mailOptions = { from: "testosv.222@gmail.com", to, subject, html:text };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = exports;
