const mongoose = require('mongoose');


const testItem = new mongoose.Schema({
    data: {
        type: Array
    }
})

module.exports = mongoose.model('deadCatData', testItem);

