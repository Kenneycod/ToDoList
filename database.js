const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ListSchema = new schema({
    item:String
})

const list = mongoose.model('list',ListSchema);

const WorkSchema = new schema({
    item:String
})

const Worklist = mongoose.model('worklist',WorkSchema);

module.exports = {list,Worklist};