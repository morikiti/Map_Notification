const request = require('request');


let timestamp = Date.now().toString();
exports.aqua = function(code,lat,lng,interval,start,end) { 
    let options = {
        url:'https://www.jpmap-jaxa.jp/jpmap/api/v1/point/?product='
        +code+'&lat='+lat+'&lon='+lng+'&interval='+interval+'&start='+start+'&end='+end,
        method: "GET",
        headers:{'Content-Type':'application/json'}
    };

    return new Promise((resolve,reject)=>{ 
        request(options,(err,res,result) => { 
            console.log(result);
            resolve('ok');
        })
    })

}