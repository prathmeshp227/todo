const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    task : String,
    date : String,
    gender : String,
    status : String
})

const Taskdb = mongoose.model('Taskdb', schema);

module.exports = Taskdb;