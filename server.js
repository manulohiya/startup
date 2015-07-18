var express = require('express'),
    app = express(),
    _ = require('underscore'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/startup');
var Idea = require('./models');
console.log(Idea);

// OPEN THE API TO REQUESTS FROM ANY DOMAIN
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));


// `ideas` array is our model (holds our data)
  // contains test (or "seed") data
  var ideas = [
    {company: "Shazam", market: "food", desc: "Imagine if you could take a photo of a dish, and the app would pull up the key info such as its history, nutritional info, and recipe"},
    {company: "Shazam", market: "food", desc: "Imagine if you could take a photo of a dish, and the app would pull up the key info such as its history, nutritional info, and recipe"},
    {company: "Shazam", market: "food", desc: "Imagine if you could take a photo of a dish, and the app would pull up the key info such as its history, nutritional info, and recipe"}
  ];


app.get('/', function(req, res) {
  var index = __dirname + "/index.html";
  res.sendFile(index);
});

// Ideas Query
app.get('/api/ideas', function (req, res) {
  // send all ideas as JSON response
  
  console.log(Idea);
  Idea.find(function(err, ideas){
  console.log("Ideas: "+ideas);
  res.json(ideas);
	});
});


// set server to localhost:3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});