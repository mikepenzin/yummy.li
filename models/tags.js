var mongoose = require('mongoose');


// Schema setup
var tagSchema = new mongoose.Schema({
  tag: { 
      type: String, 
      required: [true, 'Tag is required'],
      unique: true
  },
  searchNumber: {
      type: Number, 
      default: 0
  },
  previousData: [
    {
      date: {type: Date, default: Date.now()},
      searchNumber: Number
    }
  ]
});

tagSchema.index({'$**': 'text'});

module.exports = mongoose.model("Tag", tagSchema);