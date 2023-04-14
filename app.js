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

//connecting to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/TodoListDB')
.then(()=>{
    console.log('connected to mongodb.....');
}).catch(err =>{
    console.log(err);
})

app.get('/',(req,res)=>{

    let currentday = date();
    list.list.find().then((items)=>{
        res.render('list',{listTitle:currentday,newitem:items});
    }).catch(err => console.log(err));
})

app.post('/',(req,res)=>{

    const item = req.body.newitem;
    if (item === '') {
        console.log('cannot add empty strings');
        res.redirect('/');
    } else {
        if (req.body.list === 'work list') {

            //adding to worklist database on mongodb
            const workList = new list.Worklist({
                'item':item,
            });
            workList.save().then((err)=>{
                console.log('item inserted successfully!')
                res.redirect('/work');
            }).catch(err => console.log(err));

        } else {
           //adding to list database on mongodb
            const newlist = new list.list({
                'item':item,
            });

            newlist.save().then((err)=>{
                console.log('item inserted successfully.....')
                res.redirect('/');
            }).catch(err => console.log(err));
        }
    }
})

app.get('/work',(req,res)=>{

    list.Worklist.find().then((workitem)=>{     //geting data from mongodb and displaying on html page
        res.render('list',{listTitle: 'work list',newitem:workitem})
    }).catch(err => console.log(err));
})

app.post('/work',(req,res)=>{

    const workList = new list.Worklist({
        'item':item,
    });
    workList.save().then((err)=>{
        console.log('item inserted successfully!')
        res.redirect('/work');
    }).catch(err => console.log(err));
    res.redirect('/work');
})

app.post('/delete',(req,res)=>{
    const checked = req.body.checkbox;
    console.log(checked);

    if ({listTitle:'work list'}) {
        list.Worklist.findByIdAndRemove(checked).then(()=>{
            console.log("successfully deleted......");
            res.redirect('/work');
        }).catch(err => console.log(err));
    } else {
        list.list.findByIdAndRemove(checked).then(()=>{
            console.log("successfully deleted .......")
            res.redirect('/');
        }).catch(err => console.log(err));
    }
})

app.listen(5500,(err)=>{
    if(err){
        throw err;
    }else{
        console.log('server is running .......')
    }
})

//how to get data from mongoose and post it on htlm page using nodejs
