var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({ company: String,
  	market: String,
  	desc: String
   });


var Idea = mongoose.model('Idea', IdeaSchema)
console.log("models.js: "+Idea);
module.exports = Idea;