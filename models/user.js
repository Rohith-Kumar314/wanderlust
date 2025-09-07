const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema); 

// ==============User related Schema . passport adds username , and user id by default =====================