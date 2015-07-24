var express = require('express'),
app = express(),
_ = require('underscore'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
salt = bcrypt.genSaltSync(10),
session = require('express-session'),
db = require('./models');

// Connect to database
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/startup');

var baseUrl = "http://localhost:3000/"
// var Idea = require('./models');
// var User = require('./models');
//console.log(Idea);

// OPEN THE API TO REQUESTS FROM ANY DOMAIN
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+"/public"));


// middleware (new addition)
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    db.User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };



// render the main index.html
  app.get('/', function(req, res) {
    var index = __dirname + '/public/views/index.html';
    res.sendFile(index);
  });


//Call for sessionID
app.get('/api/users', function(req, res) {
  req.currentUser(function (err, user) {
    if (user) {
      res.send(user);
    } else {
      res.send(null);
    }
  });
});

// Ideas Query
app.get('/api/ideas', function (req, res) {
  // send all ideas as JSON response
  
  //console.log(Idea);
  db.Idea.find(function(err, ideas){
    console.log("Ideas: "+ideas);
    res.json(ideas);
  });
});


// IDEAS#CREATE
app.post('/api/ideas', function(req, res) {
  // SAVE LINE TO DB
  var idea = new db.Idea({
    company: req.body.company,
    market: req.body.market,
    desc: req.body.desc
  });
  console.log(idea);
  idea.save(function(err,idea){ 
    res.json(idea);
  });
});



// Render comment page
app.get('/ideas/:id', function(req, res) {
  var comment = __dirname + '/public/views/idea.html';
  res.sendFile(comment);
});


// Comment Query
app.get('/api/ideas/comment', function (req, res) {
  // send all ideas as JSON response
  
  //console.log(Idea);
  db.Comment.find(function(err, comment){
    console.log("Comment: "+comment);
    res.json(comment);
  });
});

// get all comments for one idea
app.get('/api/ideas/:id', function(req, res){
  // query the database to find the post indicated by the id
  var targetId = req.params.id;
  console.log("targetId: "+targetId);
  console.log("Getting comments")
  db.Idea
  .find({_id: targetId})
  .populate('comments')
  .exec(function(err, idea) {
      // RETURN IDEA
      console.log("Executing");
      console.log(idea);
      res.json(idea);
    });
});

// add a new comment to a idea
app.post('/api/ideas/:id/comments', function(req, res){

  console.log("Posting")
  //var x = '55b007be66a6e8f3c957c53d';
  var targetId = req.params.id
  console.log("Target Id:" +targetId);
  // create a new comment record
  console.log(req.body.author);
  var newComment = new db.Comment({
    author:req.body.author,
    desc:req.body.desc
  });
  newComment.save();

   // console.log("GUYS THE ID is" + x);
  // query the database to find the post indicated by the id
  db.Idea.findOne({_id:targetId}, function(err, idea){
    var foundIdea = idea;
    console.log('foundIdea: ' + foundIdea);
    console.log("new comment:" +newComment);
    console.log(newComment._id);
    foundIdea.comments.push(newComment._id);
    foundIdea.save(function (err, savedUser) {
      res.json(savedUser);
    });
 
});
});


// user submits the signup form
app.post('/api/signup', function (req, res) {
  console.log("Posting!");
  // grab user data from params (req.body)
  var email = req.body.email;
  var password = req.body.password;

  //console.log(newUser);
  // create new user with secure password
  db.User.createSecure(email, password, function (err, user) {
    //res.send(user);
    req.login(user);
    res.redirect('/');
  });
});



// user submits the login form
app.post('/api/login', function (req, res) {
  console.log("Logging in");
  // grab user data from params (req.body)
  var email = req.body.email;
  var password = req.body.password;
//  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  db.User.authenticate(email, password, function (err, user) {
    req.login(user);
 //   res.send(user);
 res.redirect('/');
});
});


// destroy `session.userId` to log out user
req.logout = function () {
  console.log("Logging out");
  req.session.userId = null;
  req.user = null;

};

next();
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
  
});




// set server to localhost:3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});