var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));

var {MongoClient,ObjectID} = require('mongodb');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("employee");

    dbo.createCollection("emp", (err,result) => {
        if (err) throw err;
        console.log("Collection created!");
    });

    app.get('/',(req,res) => {
        res.sendFile(__dirname + '/Index.html');
    });

    app.post('/insert',(req,res) => {
        var name=req.body.name;
        var city=req.body.city;
        var sql = {name : name, city : city};
        dbo.collection("emp").insertOne(sql,(err,result) => {
            if (err) throw err;
            console.log("1 inserted record...");
            res.redirect('/');
        });
    });

    app.get('/display',(req,res) => {
        dbo.collection("emp").find().toArray((err,result) => {
            if (err) throw err;
            var html = "<form action='/deleteMultiple' method='post'><table cellpadding='10' border='1'><tr><th>Select</th><th>Id</th><th>Name</th><th>City</th><th>Edit</th><th>Delete</th></tr>";
            for(let i=0;i<result.length;i++)
            {
                html +="<tr><td><input type='checkbox' name='select[]' value="+result[i]._id+"></td><td>"+ result[i]._id +"</td><td>"+ result[i].name +"</td><td>"+ result[i].city +"</td>" +
                    "<td><a href=/edit?id="+result[i]._id+"&name="+result[i].name+"&city="+result[i].city+">Edit</a></td>" +
                    "<td><a href=/delete?id="+result[i]._id+">Delete</a></td>" +
                    "</tr>";
            }
            html += "</table><input type='Submit' name='Submit' value='moreDelete'></form>";
            res.send(html);
        });
    });

    app.get('/delete',(req,res) => {
        var id = req.query.id;
        var d = {_id : new ObjectID(id)};
        dbo.collection("emp").deleteOne(d, (err, result) => {
            if (err) throw err;
            console.log("1 deleted record...");
            res.redirect('/display');
        });
    });

    app.get('/edit',(req,res) => {
        var id = req.query.id;
        var name = req.query.name;
        var city = req.query.city;
        var html = "<form action='/update' method='post'>" +
            "<table>" +
            "<tr><td><input type='hidden' name='id' value="+id+"></td></tr>" +
            "<tr><th>Name :</th><td><input type='text' name='name' value="+name+"></td></tr>" +
            "<tr><th>City :</th><td><input type='text' name='city' value="+city+"></td></tr>" +
            "<tr><td><input type='submit' name='submit' value='Update'></td></tr>" +
            "</table>";
        res.send(html);
    });

    app.post('/update',(req,res) => {
        var id=req.body.id;
        var name=req.body.name;
        var city=req.body.city;
        var myquery = {_id : new ObjectID(id)};
        var newquery = {$set:{name : name,city : city}};
        dbo.collection("emp").updateOne(myquery,newquery,(err,result) => {
            if (err) throw err;
            console.log("1 updated record...");
            res.redirect('/display');
        });
    });
    //db.close();
});
app.listen(4000);