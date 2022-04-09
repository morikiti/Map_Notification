let router = require("express").Router();
let bodyParser = require("body-parser");
let sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./sqlite3/spot.db");
const cors = require('cors');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cors());

router.get("/",(req,res) => { 
    console.log('--GET Request---');
    console.log('nameは、'+req.query.lat);
    console.log('ageは、'+req.query.lng);
    res.render('',{});
});

router.post("/",(req,res) => { 
    console.log('--POST Request---');
    console.log('nameは、'+req.body.lat);
    console.log('ageは、'+req.body.lng);
    db.serialize(()=>{ 
        db.run("create table if not exists spots(lat,lng)");
        db.run("insert into spots(lat,lng) values(?,?)",req.body.lat,req.body.lng);
        db.each("select * from spots", (err, row) => {
            console.log(`${row.lat} ${row.lng}`);
        });
    });
});

module.exports = router;
