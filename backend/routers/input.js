const router = require("express").Router();
const ejs = require('ejs');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3');
const cors = require('cors');
const db = new sqlite3.Database("./sqlite3/test1.db");

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cors());

router.get("/",(req,res) => { 
    console.log('--GET Request---');
    console.log('nameは、'+req.query.name);
    console.log('ageは、'+req.query.age);
    res.render('./input.ejs',{});
});

router.post("/",(req,res) => { 
    console.log('--POST Request---');
    console.log('nameは、'+req.body.name);
    console.log('ageは、'+req.body.age);
    db.serialize(()=>{ 
        db.run("create table if not exists members(name,age)");
        db.run("insert into members(name,age) values(?,?)",req.body.name,req.body.age);
        db.each("select * from members", (err, row) => {
            console.log(`${row.name} ${row.age}`);
        });
    });
    res.render('working!');
});


module.exports = router;

/*
router.get("/",(req,res) => {
    res.render("./input.ejs");
});

module.exports = router; */