//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
    console.log("Server is up in port 3000");
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
