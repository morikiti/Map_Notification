import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
const Button = () => { 
    const [inputlat, setInputlat] = useState('');
    const [inputlng, setInputlng] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    //const data = {lat : lat, lng : lng};
    const containerStyle = {
        height: "80vh",
        width: "100%",
    };
    //const data = {lat : lat, lng : lng};
    const defaultLatLng = {
        lat: 35.7022589,
        lng: 139.7744733,
      };

    const setInputlatValue = (e) => { 
        //eは、イベントハンドラーの略　eには、inputタグに関係する情報が格納
        //e.target.valueで、入力した値にアクセスできる。
        setInputlat(e.target.value);
    };
    const setInputlngValue = (e) => { 
        setInputlng(e.target.value);
    }
    const setLatLng = ({ x, y, lat, lng, e }) => {
        console.log(lat);
        console.log(lng);
        setLat(lat);
        setLng(lng);
    };

    const url = 'http://localhost:3000/aaaa/aa';
    const header = {'Content-Type':'application/json'};
    const handleSubmit = async(e) => { 
       /*  const setLatValue = (e) =>{ 
            setLat(e.target.value);
        }
        const setLngValue = (e) =>{ 
            setLng(e.target.value);
        }
        setLatValue(e);
        setLngValue(e);     */
        
        e.preventDefault();
        const data = {lat : inputlat, lng : inputlng};
        const options = { 
            method:'POST',
            mode:'cors',
            catch:'no-cache',
            Headers: header,
            body: JSON.stringify(data)
        }

        await fetch(url,options).then((response)=>{ 
            console.log('finish api call --',response);
        }).catch((e) =>{ 
            console.log('somrthing wrong ::',e);
        });
    }
    return (
        <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzF78uAfujGGE9YjhuDuDL-GJrWL4PVhA" }}
        defaultCenter={defaultLatLng}
        defaultZoom={16}
        onClick={setLatLng}
      />
      {<p>緯度:{lat}</p>} {<p>経度:{lng}</p>}
     {/*  {<p>緯度:{inputlat}</p>}
      {<p>経度:{inputlng}</p>} */}
            <input value={lat} /* onChange={setInputlatValue} */ name='lat' type='text'/>
            <input value={lng} /* onChange={setInputlngValue} */ name='lng' type='text'/>
            <button type="submit" onClick={handleSubmit}>送信</button>
            
        </div>
    );
};

export default Button;