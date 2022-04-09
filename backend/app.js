const express = require('express');
let bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const distance = require('./build/Release/myaddon');

app.set("view engine", "ejs");
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

console.log(distance.add(40.61372306900807,140.5689337880722,40.5976,140.5387));
app.use("/api/spots", require('./routers/marker_spot.js'));
app.use('/input',require('./routers/input.js'));
app.use('/input_area',require('./routers/input_area.js'));
app.use('/spot_confirm',require('./routers/spot_confirm.js'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
}); 
console.log(__dirname);

/* app.use(function(err, req, res, next) { 
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}); */

app.listen(port,()=>{ 
    console.log(`server ${port}`);
})