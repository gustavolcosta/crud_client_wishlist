const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name:{
      type:String,
      required:[true, 'Name is a required field']
  },
  email:{
      type:String,
      required:[true, 'Email is a required field']
  },
  favoriteProducts: { type : Array , "default" : [] }
});

const Client = mongoose.model('Client',ClientSchema);
module.exports = Client;