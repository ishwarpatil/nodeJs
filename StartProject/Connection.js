const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    //student
    app.post('/api/student', (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var city = req.body.city;
        var sql = "INSERT INTO student (name,email,city) VALUES ('" + name + "','" + email + "','" + city + "')";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Inserted");
        });
    });

    app.get('/api/student', (req, res) => {
        var sql = "select * from student where display='' ";
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.send(result);
        });
    });

    app.delete('/api/student/:id', (req, res) => {
        var id = req.params.id;
        var sql = "update student,marks set student.display='no',marks.display='no' where student.id = " + id;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Delete");
        });
    });

    app.put('/api/student/:id', (req, res) => {
        var id = req.params.id;
        var name = req.body.name;
        var email = req.body.email;
        var city = req.body.city;
        var sql = "update student set name='" + name + "',email='"+ email +"',city='" + city + "' where id = " + id;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Updated");
        });
    });


    //Marks
    app.post('/api/marks', (req, res) => {
        var id = req.body.id;
        var subject = req.body.subject;
        var mark = req.body.mark;
        var sql = "INSERT INTO marks (id,subject,mark) VALUES ('" + id + "','" + subject + "','" + mark + "')";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Inserted");
        });
    });

    app.get('/api/marks', (req, res) => {
        var sql = "select * from marks where display='' ";
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.send(result);
        });
    });

    app.put('/api/marks/:mid', (req, res) => {
        var mid = req.params.mid;
        var id = req.body.id;
        var subject = req.body.subject;
        var mark = req.body.mark;
        var sql = "update marks set id='" + id + "',subject='"+ subject +"',mark='" + mark + "' where mid = " + mid;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send("1 Record Updated");
        });
    });

});

app.listen(3000);
