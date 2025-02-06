const mongoose = require('mongoose');

const Group_message_Schema = new mongoose.Schema({
    _id: string,
from_user: {type: String},
room: {type: String},
message: {type: String},
date_sent: {type: Date}
});

Group_message_Schema.pre('save', (next) => {
    console.log("Before save")
    let now = Date.now()


if(!this.created){
    this.date_sent = now
}
});