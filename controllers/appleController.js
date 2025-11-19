const db = require('../db/queries.js');

async function getAllApplesRender(req, res) {
    try{
        const appleArray = await db.getAllApples();
        res.render('appleList', {
            title: 'The Apple List',
            stylesheet: '/styles/appleList.css',
            appleArray,
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet:'error.css',
            error: `Unable to reach Database. Please try again later ${err.message}`,
            error_code: '500'
        })
    }
    
};

async function getAppleById(req, res) {
    try {
        const appleId = req.params.id;
        const appleArray = await db.getAppleById(appleId);
        if (appleArray.length < 1) {
            res.status(404).render('error', {
                title:'Error',
                stylesheet:'/styles/error.css',
                error_code:'404',
                error:'No matching apple found, please try again',
            });
        } 
        const apple = appleArray[0];
        res.render('apple', {
            title: apple.name,
            name: apple.name,
            stylesheet:'/styles/apple.css',
            nickname: apple.nickname,
            origin: apple.country_of_origin,
            image_link: apple.image_link,
            notes: apple.notes,
            color: apple.color,
            avgPrice: apple.avg_price,
            success: req.query.success
            
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet:'/styles/error.css',
            error: 'Unable to reach Database. Please try again later',
            error_code: '500'
        });
    };
};

async function newAppleGet(req, res) {
    

    try {
        res.render('newApple', {
        title: 'New Apple Form',
        stylesheet:'/styles/update.css',
        success: req.query.success,
        
        });
    } catch (err) {
        res.status(500).render('error', {
            title:'Server Error',
            stylesheet:'/styles/error.css',
            error: 'why',
            error_code:'500',
        });
    };
    };

    
    


async function newApplePost(req, res) {
    try {
        const apple = {
            name: `${req.body.name}`,
            nickname:`${req.body.nickname}`,
            origin: `${req.body.origin}`,
            image_link: `${req.body.image_link}`,
            notes: `${req.body.notes}`,
            color:`${req.body.color}`,
            avgPrice:`${req.body.avgPrice}`
        }
        await db.newApple(apple);
        res.redirect('/apples/new?success=1');
    } catch (err) {
        res.status(500).render('error', {
            title:'Server Error',
            stylesheet:'/styles/error.css',
            error: err.message,
            error_code:'500',
        });
    };
};

async function updateAppleFormGet(req, res) {
    try {
        const appleArray = await db.getAppleById(req.params.id);
        const apple = appleArray[0];
        res.render('updateApple', {
            title: 'Update Apple Form',
            stylesheet:'/styles/update.css',
            apple,
            success: req.query.success,
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet: '/styles/error.css',
            error: err.message,
            error_code:'500'
        });
    };
    
};

async function updateAppleFormPost(req, res) {
    try {
        const apple = {
            id: `${req.params.id}`,
            name: `${req.body.name}`,
            nickname:`${req.body.nickname}`,
            origin: `${req.body.origin}`,
            image_link: `${req.body.image_link}`,
            notes: `${req.body.notes}`,
            color:`${req.body.color}`,
            avgPrice:`${req.body.avgPrice}`
        };
        await db.updateApple(apple);
        res.redirect(`/apples/${req.params.id}?success=1`);
    } catch (err) {
        res.status(400).render('error', {
            title: 'Bad Request',
            stylesheet: '/styles/error.css',
            error: err.message,
            error_code:'400'
        });
    };
};

async function deleteApple(req, res) {
    try {
        await db.deleteApple(req.params.id);
        res.redirect('/apples');
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet: '/styles/error.css',
            error: err.message,
            error_code:'500'
        });
    };
};

module.exports = {deleteApple, updateAppleFormGet, updateAppleFormPost, newAppleGet, newApplePost, getAllApplesRender, getAppleById};
