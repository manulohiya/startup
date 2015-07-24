var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
salt = bcrypt.genSaltSync(10);

//Comment Scema
var commentSchema = new Schema({
  author: String,
  desc: String

});

var Comment = mongoose.model('Comment', commentSchema)

//Idea Scema
var ideaSchema = new Schema({ 
  company: String,
  market: String,
  desc: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment" 
  }] 
});

var Idea = mongoose.model('Idea', ideaSchema);

//User Scema
var userSchema = new Schema({
	email: String,
	passwordDigest: String

});



// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our schema
  // store it in variable `that` because `this` changes context in nested callbacks
  var that = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      that.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (user === null) {
      throw new Error('Can\'t find user with email ' + email);

    // if found user, check if password is correct
  } else if (user.checkPassword(password)) {
    callback(null, user);
  }
});
};

// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // return hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};


var User = mongoose.model('User', userSchema);
console.log("models.js: "+Idea);
module.exports.User = User;	
module.exports.Idea = Idea;
module.exports.Comment = Comment;