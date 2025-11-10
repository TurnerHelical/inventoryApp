


async function homepageGet(req, res) {
    res.render('index', {
        title: ' The AppleTree',
        stylesheet:'/styles/home.css',
    });
};

module.exports = { homepageGet };