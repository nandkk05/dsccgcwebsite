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