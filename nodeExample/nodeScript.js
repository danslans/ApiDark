var http = require('http'); // 1 - Import Node.js core module
var mongoose = require('mongodb').MongoClient; 
var httpUrl = require("url");
var server = http.createServer(function (req, res) {   // 2 - creating server
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.url == "/"){
        //httpUrl.parse(req.url);
        console.log(req.url);
        res.writeHead(200,{ 'Content-Type': 'application/json' });
        mongoose.connect("mongodb://192.168.0.6:27017",(error,db)=>{
          var dbo =  db.db("danslans");
          dbo.collection("users").findOne();
        });
        res.write('{"persons":[{"name":"Daniel"},{"name":"Daniel"},{"name":"Daniel"},{"name":"Daniel"}]}');
        res.end();
    }
});

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')
