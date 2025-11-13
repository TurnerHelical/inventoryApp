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
            name:`${apple.name}`,
            stylesheet:'/styles/apple.css',
            nickname: `${apple.nickname}`,
            origin: `${apple.country_of_orgin}`,
            quantity: `${apple.quantity}`,
            best_month: `${apple.best_month}`,
            image_link: `${apple.image_link}`,
            color:`${apple.color}`,
            price:`${apple.price}`,
            
        });
    } catch (err) {
        res.render(500).render('error', {
            title: 'Server Error',
            stylesheet:'/styles/error.css',
            error: 'Unable to reach Database. Please try again later',
            error_code: '500'
        });
    };
};

async function newAppleGet(req, res) {
    const { success } = req.query;

    res.render('newAppleForm', {
        title: 'New Apple Form',
        stylesheet:'styles/newAppleForm.css',
        success,
    });
};

async function newApplePost(req, res) {
    try {
        const apple = {
            name: `${req.body.name}`,
            nickname:`${req.body.nickname}`,
            origin: `${req.body.origin}`,
            quantity: `${req.body.quantity}`,
            best_month: `${req.body.best_month}`,
            image_link: `${req.body.image_link}`,
            color:`${req.body.color}`,
            price:`${req.body.price}`
        }
        await db.newApple(apple);
        res.redirect('/new?success=1');
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
        const { success } = req.query;
        const apple = await db.getAppleById(req.params.id)
        res.render('updateAppleForm', {
            title: 'Update Apple Form',
            stylesheet:'/styles/update.css',
            apple,
            success,
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

async function updateAppleFormPut(req, res) {
    try {
        const apple = {
            name: `${req.body.name}`,
            nickname:`${req.body.nickname}`,
            origin: `${req.body.origin}`,
            quantity: `${req.body.quantity}`,
            best_month: `${req.body.best_month}`,
            image_link: `${req.body.image_link}`,
            color:`${req.body.color}`,
            price:`${req.body.price}`
        };
        await db.updateApple(apple);
        res.redirect(`/${req.params.id}?success=1`);
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet: '/styles/error.css',
            error: err.message,
            error_code:'500'
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

module.exports = {deleteApple, updateAppleFormGet, updateAppleFormPut, newAppleGet, newApplePost, getAllApplesRender, getAppleById};
