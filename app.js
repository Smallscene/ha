const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const postParse =bodyParser.urlencoded({extended:false});
const dbmomdel = require("./data/db.js");
const db = new dbmomdel("1990");
app.use(express.static("../xnxiangmu"));
const cName = "info"
;
//获取主页面
app.get("/addget",(req,res)=>{
    db.find(cName,{},(err,data)=>{
        if (err)throw err;
        res.send(data)
    })
});
app.post("/addpost",postParse,(req,res)=>{
    let obj = req.body;
    obj.statics = "white";
    db.insertOne(cName,obj,(err,data)=>{
        if (err)throw err;
        res.send(data)

    })
});
//删除
app.get("/dle",(req,res)=>{
    let obj = req.query;
    db.deleteById(cName,obj.id,(err,data)=>{
        if (err)throw err;
        res.send(data)
    })
});
//完成
app.get("/wc",(req,res)=>{
    let data = req.query;
    console.log(data);
    db.findById(cName,data.id,(err,data1)=>{
        console.log("哈哈",data1);
        if (data1.statics=="white"){
            db.updateById(cName,data1._id,{statics:data.statics},(err,data1)=>{
                if (err)throw err;
                res.send(data1)
            })
        }
    })
});
app.listen(81,function f() {
    console.log("成功")
});