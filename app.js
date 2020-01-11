//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(process.env.PORT, function() {
    console.log("Server is up");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/7cd165f022",
        method: "POST",
        headers: {
            "Authorization": "basic b867eb57b716f044de36d746cdc1cc46-us4"
        },
        body: [JSON.stringify(data)]
    };

    request(options, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname+"/failure.html");
        } else if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
    });
});

app.post("/failure", function(req, send){

    res.redirect("/");

});

// 7cd165f022 // -  Armadillomail list ID
