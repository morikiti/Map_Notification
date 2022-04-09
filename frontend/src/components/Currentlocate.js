/* eslint-disable react/react-in-jsx-scope */
import { useState,useRef } from "react";

const Currentlocate = () => { 
  const [lat,setLat] = useState('');
  const [lng,setLng] = useState('');
  const intervalRef = useRef(null);
  navigator.geolocation.getCurrentPosition(pos =>{ 
    setLat(pos.coords.latitude);
    setLng(pos.coords.longitude);
  });

  let currents = {lat:lat,lng:lng};
  const url = 'http://localhost:3001/spot_confirm';
  const header = {'Content-Type':'application/json'};
  /*  let timerId  = ()=>{ setInterval(async(e)=> { 
        const data = {lat : lat, lng : lng};
        const options = { 
            method: 'POST',
            mode:'cors',
            cache: 'no-cache',
            headers: header,
            body: JSON.stringify(data)
        }
        const options2 = { 
            method: 'GET',
            mode:'cors',
            cache: 'no-cache',
            headers: header,
        }

        await fetch(url,options).then((response)=>{ 
            console.log('finish api call -response:::',response);
            console.log(JSON.stringify(data));
            
        }).catch((error)=>{ 
            console.log('something wrong:::',error);
        });
    
        await fetch(url,options2).then((res)=> {
            console.log('finish api2 call -response::',res);
            let judge = res.json();
           console.log("resってなんだ？",judge[0]);
        }).catch((err)=>{ 
            console.log('something wrong::',err);
        })
    },10000);
    } */
  const start = () =>{ 
    intervalRef.current = setInterval(async(e)=>{ 
      const data = {lat : lat, lng : lng};
      const options = { 
        method: 'POST',
        mode:'cors',
        cache: 'no-cache',
        headers: header,
        body: JSON.stringify(data)
      }
      const options2 = { 
        method: 'GET',
        mode:'cors',
        cache: 'no-cache',
        headers: header,
      }
    
      await fetch(url,options).then((response)=>{ 
        console.log('finish api call -response:::',response);
        console.log(JSON.stringify(data));
                
      }).catch((error)=>{ 
        console.log('something wrong:::',error);
      });
        
      await fetch(url,options2).then((res)=> {
        console.log('finish api2 call -response::',res);
        console.log("resってなんだ？",res.status);
      }).catch((err)=>{ 
        console.log('something wrong::',err);
      })
    },10000);
  };
    

  const stop = () => { 
    clearInterval(intervalRef.current);
  };
  /*   setTimeout(async()=>{ 
        const options = { 
            method: 'GET',
            mode:'cors',
            cache: 'no-cache',
            headers: header,
        }
        await
    }) */

  return(
    <div>
      <br/><br/> <br/><br/> <br/><br/>
      {<p>現在位置</p>}
      {<p>緯度:{currents.lat}</p>} {<p>経度:{currents.lng}</p>}
      <button onClick={start}>start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default Currentlocate;