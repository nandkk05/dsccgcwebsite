var keys=require('../config/keys');
const sgMail = require('@sendgrid/mail');

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
sgMail.setApiKey(keys.sendapi);
const msg = {
  to: req.body.email,
  from : { email : 'noreply@dsccg.com' , name: 'no-reply'},
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};
sgMail.send(msg).then((sent,err) => {
  console.log(sent)
  console.log(err)
})
}

exports.cgc_cloud=(req,res)=>{
  res.render('cgc-cloud', {
    title: 'Cloud Workshop Registration',
    req
  })
}