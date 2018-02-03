var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json()); //pass the values in postman then use bodyParser.json()
app.use(bodyParser())

var session = require('express-session');
app.use(session({secret: 'mySession'}));

var {mongoose} = require('./db/mongoose');
var {user} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/authform.html');
});

app.post('/insert',(req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    var insertUser = new user({
        email : email,
        password : password
    });
    insertUser.save().then((user)=>{
        res.redirect('/');
    },(e)=>{res.send(e)});
});

//verify token
app.get('/users/me',authenticate,(req,res) => {
    res.send(req.user);
});

//delete token
app.delete('/users/me/token',authenticate,(req,res) => {
    req.user.removeToken(req.token).then((result) => {
    },(err) => {
        res.send(err);
    });
});

//login user
app.post('/users/login',(req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    var session;
    user.findByCredentials(email,password).then((user) => {
        session = req.session;
        session.email = req.body.email;
        session.password = req.body.password;
        console.log(session.email+"  "+session.password);
        res.send(user);
    },(err) => {
        res.send(err);
    });
});
app.listen(5081);

