//var MongoClient = require('mongodb').MongoClient;
var {MongoClient,ObjectID} = require('mongodb');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    //created database and name is mydb
    var dbo = db.db("mydb");

    //created the table and name is customers
    /*
    dbo.createCollection("customers", (err, res) => {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    */

    //inserted recodes in customers table so use insertOne() or insertMany()
    /*
    var sql = { name: "sagar", address: "pune" };
    dbo.collection("customers").insertOne(sql, (err, result) => {
        if (err) throw err;
        console.log("1 document inserted");
        console.log(result.ops[0]._id);
        db.close();
    });
    */

    //show the all recodes and show one recode so use findOne({name:'ishwar'}) or find() or limit(5)
    /*
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find().toArray( (err, result) => {
        if (err) throw err;
        //console.log(result);
        for(let i=0;i<result.length;i++)
        {
            console.log(result[i].name);
        }
        db.close();
    });
    var query = { _id: new ObjectID('5a6eb1000084c931c035bd45') };
    dbo.collection("customers").find(query).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    */

    //count all recodes so use count()
    /*
    dbo.collection("customers").find().count().then((count) => {
        console.log(`count : ${count}`);
    }, (err) => { console.log("Not Count Records...");
        db.close();
    });
    */

    // sort all name so use sort(name: 1)
    // { name: 1 } ascending
    // { name: -1 } descending
    /*
    var sort = { address: 1 };
    dbo.collection("customers").find().sort(sort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    */

    //delete record so use deleteOne({address : 'nashik'}) or deleteMany({ address: /^O/ }) address starting with O character
    /*
    var myquery = { address: 'nashik' };
    dbo.collection("customers").deleteOne(myquery, (err, obj) => {
        if (err) throw err;
        //console.log(obj.result.n + " document(s) deleted"); // 2 records deleted
        console.log("1 document deleted");
        db.close();
    });
    */

    //update records so use updateOne3(old,newValue) or updateMany{ address: /^S/ };
    /*
    var myquery = {name : 'sagar'};
    var newquery = {$set:{name : 'mukesh',address : 'kim'}};
    dbo.collection("customers").updateOne(myquery, newquery, (err,res) => {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    */

});
