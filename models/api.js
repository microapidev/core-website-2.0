const mongoose = require('mongoose');
const moment = require("moment");

const apiSchema = mongoose.Schema({
    owner: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        default: moment(Date.now()).format()
    }
});

module.exports = mongoose.model('Apis', apiSchema);
