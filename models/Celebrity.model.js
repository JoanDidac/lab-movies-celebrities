const mongoose = require('mongoose');



const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    default: "unknown"
  },
  catchPhrase: {
    type: String,
    default: "No catchphrase"
  }

});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
