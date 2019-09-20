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
sgMail.setApiKey(keys.sendapi);
const msg = {
  to: req.body.email,
  from : { email : 'noreply@dsccg.com' , name: 'no-reply'},
  subject: 'Thanks For Contacting DSC CGC.',
  text: 'Your Query have been successfully received by DSC CGC.You will be Contacted Shortly',
  html: '<strong>Your Query have been successfully received by DSC CGC.You will be Contacted back Shortly.</strong>'
};
sgMail.send(msg).then((sent,err) => {
  if(!err)
  {
    console.log("sent");
    module.exports.sendToDsc(req,res);
    res.send("Your Query have been successfully received by DSC CGC.You will be Contacted Shortly")
  }
})
}

exports.sendToDsc=(req,res)=>{
sgMail.setApiKey(keys.sendapi);
const msg = {
  to: 'dsc.cgc.coe@gmail.com',
  from : { email : 'noreply@dsccg.com' , name: 'no-reply'},
  subject: `Contact Request From ${req.body.name}`,
  text: 'Someone have submitted a Request To Contact You',
  html: `<strong>Request Form have been submitted by ${req.body.name} ${req.body.email} ${req.body.number} ${req.body.comments}</strong>`
};
sgMail.send(msg).then((sent,err) => {
  if(!err)
  {
    console.log("sent");
  }
})
}

exports.cgc_cloud=(req,res)=>{
  res.render('cgc-cloud', {
    title: 'Cloud Workshop Registration',
    req
  })
}