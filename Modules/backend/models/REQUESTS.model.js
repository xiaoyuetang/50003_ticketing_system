const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var chatSchema = new Schema(
//   {
//     name: {type: String}, // Who is addressing it
//     message: {type: String} // message content
//   }
// );

let RequestsSchema = new Schema({
    username: {type: String, default:"no account"},// max: 100}, // If the user is signed in then the username is already in the system
    name:{type: String}, // This is for users who don't have accounts
    email: {type: String}, //, required: true},
    contact_num: {type: Number}, //require: true},
    date: {type: Date, default:new Date()}, // auto-generated
    title:{type:String},
    message:{type: String}, // user-typed
    imageURL: {type: String, default: ''}, // retrieved from Amazon
    img : { data: Buffer, contentType: String },  // use fs for testing
    priority:{type: Number, default:-1}, // Calculated between 0-1, accepts floats
    status:{type: String, default:'unaddressed'}, // unaddressed, addressing, finished
    who:{type: String, default:'unaddressed'}, // Admin Username. Find a way to link
    team:{type: String, default:''}, // Keep track of which team is assigned to handle it
    tags:{type: [String]}, // Array of tags of String data type
    category:{type: String, default:''}, // selected from a drop-down
    chat:{type: [
      {
        name:{type:String},
        message: {type:String},
        date:{type: Date, default:new Date()}
      }
    ]}, // An array of hashMaps
    dateTaken:{type: Date},
    dateComplete:{ type: Date},
    solution:{type: String, default:''} // At the end when the admin completes the ticket this is filled up
});


// Export the model
module.exports = mongoose.model('REQUEST2', RequestsSchema);
