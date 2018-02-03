var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));

var {mongoose} = require('./db/mongoose');
var {dept} = require('./models/dept');

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/Index.html');
});

app.post('/insert',(req,res) => {
    var name = req.body.name;
    var location = req.body.location;
    var insertDept = new dept({
        name : name,
        location : location
    });
    insertDept.save().then((result) => {
        console.log("1 inserted record...");
        res.redirect('/');
    }, (err) => {
       console.log(err);
    });
})

app.get('/display',(req,res) => {
    dept.find().then((result) => {
        var html = "<table cellpadding='10' border='1'><tr><th>Id</th><th>Name</th><th>City</th><th>Edit</th><th>Delete</th></tr>";
        for(let i=0;i<result.length;i++)
        {
            html +="<tr><td>"+ result[i]._id +"</td><td>"+ result[i].name +"</td><td>"+ result[i].location +"</td>" +
                "<td><a href=/edit?id="+result[i]._id+"&name="+result[i].name+"&location="+result[i].location+">Edit</a></td>" +
                "<td><a href=/delete?id="+result[i]._id+">Delete</a></td>" +
                "</tr>";
        }
        html += "</table>";
        res.send(html);
        res.send();
    }, (err) => {
        console.log(err);
    });
});

app.get('/delete',(req,res) => {
    var id = req.query.id;
    dept.findOneAndRemove({_id:id}).then((result) => {
        console.log("1 deleted record...");
        res.redirect('/display');
    }, (err) => {
        console.log(err);
    });
});

app.get('/edit',(req,res) => {
    var id = req.query.id;
    var name = req.query.name;
    var location = req.query.location;
    var html = "<form action='/update' method='post'>" +
        "<table>" +
        "<tr><td><input type='hidden' name='id' value="+id+"></td></tr>" +
        "<tr><th>Name :</th><td><input type='text' name='name' value="+name+"></td></tr>" +
        "<tr><th>City :</th><td><input type='text' name='location' value="+location+"></td></tr>" +
        "<tr><td><input type='submit' name='submit' value='Update'></td></tr>" +
        "</table>";
    res.send(html);
});

app.post('/update',(req,res) => {
    var body = _.pick(req.body,[id,name,location]);
    var id=req.body.id;
    var name=req.body.name;
    var location=req.body.location;
    var myquery = {_id : id};
    var newquery = {$set:{name : name,location : location}};
    dept.findOneAndUpdate(myquery,newquery).then((result) => {
        console.log("1 updated record...");
        res.redirect('/display');
    }, (err) => {
        console.log(err);
    });
});

app.listen(5000);