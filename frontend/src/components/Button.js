/* eslint-disable react/react-in-jsx-scope */
import GoogleMapReact from 'google-map-react';
import  { useState,useEffect } from 'react';
const Button = () => { 
  const [spots, setSpots] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const containerStyle = {
    height: "80vh",
    width: "100%",
  };

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };
  const setLatLng = ({ lat, lng }) => {
    console.log(lat);
    console.log(lng);
    setLat(lat);
    setLng(lng);
  };
   
  const url = 'http://localhost:3001/input_area';
  const header = {'Content-Type':'application/json'};
  const handleSubmit = async(e) => { 
    e.preventDefault();
    const data = {lat : lat, lng : lng};
    const options = { 
      method: 'POST',
      mode:'cors',
      cache: 'no-cache',
      headers: header,
      body: JSON.stringify(data)
    }

    await fetch(url,options).then((response)=>{ 
      console.log('finish api call -response:::',response);
      console.log(JSON.stringify(data));
    }).catch((error)=>{ 
      console.log('something wrong:::',error);
    });
  }

   
  useEffect(()=>{ 
    fetch('/api/spots')
      .then((res) => res.json())
      .then((data) => setSpots(data));
  },[])
  console.log(spots);
  let locates = [];
  for(let la of spots) { 
    let locate = {lat:Number(la.lat), lng : Number(la.lng)};
    locates.push(locate);
  }

  const handleApiLoaded = ({map,maps}) => { 
    const bounds = new maps.LatLngBounds();
    locates.forEach((locate)=>{ 
      const marker = new maps.Marker({
        position:{ 
          lat: locate.lat,
          lng: locate.lng,
        },
        map,
      });
      bounds.extend(marker.position);
    });
  };

  return ( 
    // eslint-disable-next-line react/react-in-jsx-scope
    <div style={containerStyle}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: "AIzaSyAzF78uAfujGGE9YjhuDuDL-GJrWL4PVhA" }}
        defaultCenter={defaultLatLng}
        defaultZoom={12}
        onClick={setLatLng}
        onGoogleApiLoaded={handleApiLoaded}
      >
      </GoogleMapReact>
            
      {<p>緯度:{lat}</p>} {<p>経度:{lng}</p>}
            
      <form onSubmit={handleSubmit}>
        <input value={lat}  name='lat' type='text'/>
        <input value={lng} name='lng' type='text'/>
        <button type='submit'>位置登録ボタン</button>
      </form>
    </div>
  );
};

export default Button;