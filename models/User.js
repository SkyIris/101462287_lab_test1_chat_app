const mongoose = require('mongoose');

const User_Schema = new mongoose.Schema({
    _id: string,
username: {type: String},
firstname: {type: String},
lastname: {type: String},
password: {type: String},
createon: {type: Date}
});

User_Schema.pre('save', (next) => {
    console.log("Before save")
    let now = Date.now()



if(!this.created){
    this.createon = now
}
});