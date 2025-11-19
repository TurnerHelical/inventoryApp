

async function contactPageGet(req, res) {
    res.render('contact', {
        title: 'Contact Me',
        stylesheet: '/styles/contact.css',
    })
}

module.exports = {contactPageGet};