var express = require('express'),
    app = express(),
    _ = require('underscore'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/startup');
var Idea = require('./models');
console.log(Idea);

// OPEN THE API TO REQUESTS FROM ANY DOMAIN
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+"/public"));


app.get('/', function(req, res) {
  var index = __dirname + '/public/views/index.html';
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

// IDEAS#CREATE
app.post('/api/ideas', function(req, res) {
  // SAVE LINE TO DB
  var idea = new Idea({
    company: req.body.company,
    market: req.body.market,
    desc: req.body.desc
  });

  idea.save(function(err, idea) {
    res.json(idea);
  });
});


// set server to localhost:3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});