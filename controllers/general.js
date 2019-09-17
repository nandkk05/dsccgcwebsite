exports.index = (req, res) => {
    res.render('index', {
        title: 'Index',
        req
      })
}
exports.contact_us = (req, res) => {
  res.render('contact-us', {
      title: 'Contact Us',
      req
    })
}

exports.contact_us_post=(req,res)=>{
  console.log(req.body);
  const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'mohit.gupta30000@gmail.com',
  from : { email : 'noreply@skilldosti.com' , name: 'no-reply'},
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg).then((sent,err) => {
  console.log(sent)
  console.log(err)
})
}