/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import GoogleMapReact from 'google-map-react';
import  { useState,useEffect } from 'react';
import env from 'dotenv'
env.config();

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
    <div style={containerStyle}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
        defaultCenter={defaultLatLng}
        defaultZoom={12}
        onClick={setLatLng}
        onGoogleApiLoaded={handleApiLoaded}
      >
      </GoogleMapReact>
    </div>
  );
};

export default Button;