const router = require('express').Router();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const db = new sqlite3.Database("./sqlite3/spot.db");
const Line = require('../module/line.js');
const myLine = new Line();
const Config = require("../Config/key.js");
myLine.setToken(Config.LINE_TOKEN);
const cors = require('cors');
const distance = require('../build/Release/myaddon');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cors());

const text = "目的地付近です。";

const currentlocate = {lat:null,lng:null};
router.post('/',(req,res)=>{  
    console.log('現在位置の緯度は、'+req.body.lat);
    console.log('現在位置の経度は,'+req.body.lng);
    currentlocate.lat = Number(req.body.lat);
    currentlocate.lng = Number(req.body.lng);
    res.render('',{});
})


router.get('/',(req,res)=>{ 
    db.serialize(()=>{ 
        db.all("select * from spots", (err, rows) => { 
            if(!err && rows) { 
                const newRows = rows.map((row)=>{ 
                    return row;
                });
                console.log("spot_confirm : "+newRows[0]);
                console.log(newRows[0].lat,newRows[0].lat);
                
                let length = distance.add(newRows[0].lat,newRows[0].lng,currentlocate.lat,currentlocate.lng);
                const data = {result:length,judge:null};
                console.log(data);
                if(length< 2000){ 
                   myLine.notify(text); 
                   let date = new Date();
                    data.result = date.toLocaleDateString();
                    data.judge = "ok";
                    res.json(data);
                }else { 
                    let date = new Date();
                    data.result = date.toLocaleDateString();
                    console.log(length);
                    data.judge = "No";
                    res.json();
                }
            }
        });
    });  
});

module.exports = router;