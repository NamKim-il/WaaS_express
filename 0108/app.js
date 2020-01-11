const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/XSS',(req,res,next)=>{
    const keyList=req.body;
    let bool=false;
    for(const key in keyList)
    {
        if(keyList[key]==='<script>'){
            bool=true;
            res.status(400).send('XSS by '+key+':'+keyList[key]);
        }
    }  
    if(bool===false)  
        res.status(200).send(keyList);
    next();
});

module.exports = app;
