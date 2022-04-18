const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


let scheduleDB;

MongoClient.connect(
    'mongodb+srv://admin:qwer1234@cluster0.3uwxb.mongodb.net/schedule?retryWrites=true&w=majority',
    (error,client)=>{
        if(error) {return console.log('데이터베이스 오류')};

        scheduleDB = client.db('schedule');

        app.listen(8080,()=>{
            console.log('8080 포트 오픈');
        })
    }
)


app.get('/index',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
app.get('/write',(req,res)=>{
    res.sendFile(__dirname + '/write.html');
})

app.post('/add',(req,res)=>{
    scheduleDB.collection('today').insertOne({
        title:req.body.title,
        order:req.body.order,
        _id:100
    },req.body,(error,result)=>{
        if(error) {return console.log('저장실패')};
        console.log('저장완료')
    })
    res.sendStatus(200);
})
