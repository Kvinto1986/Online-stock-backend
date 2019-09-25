const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const SenderSchema = new Schema({
     name: {
         type: String,
         required: true
     }
 })

const Sender = mongoose.model('sender', SenderSchema);

module.exports = Sender;