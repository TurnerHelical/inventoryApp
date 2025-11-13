const express = require('express');

const app = express();

const path = require('path');

const indexRouter = require('./routes/index.js');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')))

app.use((req, res, next) => {
    res.locals.title = '';
    res.locals.stylesheet = '';
    res.locals.error = '';
    res.locals.success = '';
    next();
});

app.use(express.urlencoded({extended: true}));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error
    } 
        console.log(`Server running at ${PORT}.` );
    
});