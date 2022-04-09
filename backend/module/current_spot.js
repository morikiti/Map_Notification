exports.current_spot = function(){ 
    let data = {lat:null,lng:null};
    navigator.geolocation.getCurrentPosition((pos)=>{ 
            let crd = pos.coords;
            data.lat = crd.latitude;
            data.lng = crd.longitude;
            let res = JSON.parse(data);
            return res;
        })    
}




































    /* return new Promise((resolve,reject)=>{ 
        let data = {lat:null,lng:null};
        navigator.geolocation.getCurrentPosition((pos)=>{ 
            let crd = pos.coords;
            data.lat = crd.latitude;
            data.lng = crd.longitude;
            let res = JSON.parse(data);
        })
        resolve(res);
    }) */