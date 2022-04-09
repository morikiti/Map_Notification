let router = require('express').Router();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const db = new sqlite3.Database("./sqlite3/spot.db");
const spot_confirm = require('../module/current_spot.js');
const Line = require('../module/line.js');
const myLine = new Line();
const Config = require("../Config/key.js");
myLine.setToken(Config.LINE_TOKEN);




router.get('/',(req,res)=>{ 
    db.serialize(()=>{ 
        //db.run("delete from spots");
        db.all("select * from spots", (err, rows) => { 
            if(!err && rows) { 
                const newRows =rows.map((row)=>{ 
                    return row;
                });
               /*  console.log(newRows);
                console.log(newRows.length); */
                res.json(newRows);
            }
        });

    });  
});

module.exports = router;