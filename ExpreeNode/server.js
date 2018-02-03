
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/coding'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/headerFooter');

//refresh webpage after call this function in command line
app.use((req,res,next) => {
    console.log(new Date());
    fs.appendFile('getContain.txt','Hello Word...');
    next();
});

//update site progress so not any file run So that time use the this function
app.use((req,res,next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getDate',() =>{
    CurrentDate = new Date().getFullYear();
    return CurrentDate;
});

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pagetitle:'home Page',
        CurrentDate: new Date().getFullYear()
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pagetitle:'Abouts Page',
        CurrentDate: new Date().getFullYear()
    });
});

app.listen(3000,() => console.log("Ok"));