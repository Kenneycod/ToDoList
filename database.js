const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ListSchema = new schema({
    item:String
})

const list = mongoose.model('list',ListSchema);

module.exports = list;