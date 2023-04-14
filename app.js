const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const list = require('./database');
const date = require('./date.js');

const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
mongoose.set('strict',false);
app.set("view engine","ejs");

let items =['pasta','chicken','rice'];
let workitem = [];

//connecting to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/TodoListDB')
.then(()=>{
    console.log('connected to mongodb.....');
}).catch(err =>{
    console.log(err);
})

app.get('/',(req,res)=>{

    let currentday = date();

    res.render('list',{listTitle:currentday,newitem:items});
})

app.post('/',(req,res)=>{
    console.log(req.body);
    const item = req.body.newitem;

    if (item === '') {
        console.log('cannot add empty strings');
        res.redirect('/');
    } else {
        if (req.body.list === 'work list') {
            workitem.push(item);

            //adding to item to mongodb
            const newlist = new list({
                'item':item,
            });
            newlist.save().then((err)=>{
                console.log('item inserted successfully!')
                res.redirect('/work');
            }).catch(err => console.log(err));

        } else {
            items.push(item);   
            res.redirect('/');
        }
    }
    console.log(items);
})

app.get('/work',(req,res)=>{
    res.render('list',{listTitle: 'work list',newitem:workitem})
})

app.post('/work',(req,res)=>{

    let item = req.body.newitem;

    workitem.push(item);
    res.redirect('/work');
})

app.listen(5500,(err)=>{
    if(err){
        throw err;
    }else{
        console.log('server is running .......')
    }
})

//how to get data from mongoose and post it on htlm page using nodejs
