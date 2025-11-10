const db = require('../db/queries.js');

async function getAllApplesRender(req, res) {
    try{
        const appleArray = await db.getAllApples();
        res.render('apples', {
            title: 'The Apple List',
            stylesheet: '/styles/appleList.css',
            appleArray,
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Server Error',
            stylesheet:'error.css',
            error: 'Unable to reach Database. Please try again later',
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