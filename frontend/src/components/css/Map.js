//import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GoogleMapReact , Marker } from 'google-map-react';
import { useState, useEffect } from 'react';


const center = { 
    lat: 40.621895,
    lng: 141.237,
};

const Map = () => {
    const [spots, setSpots] = useState('');
    useEffect(()=>{ 
      fetch('/api')
      .then((res) => res.json())
      .then((data) => setSpots(data));
    },[])
  
    let locates = [];
    for(let la of spots) { 
      let locate = {lat:Number(la.lat), lng : Number(la.lng)};
      locates.push(locate);
    }

   
    return (
      <div>
      <a href="http://localhost:3001/input_area">地点入力</a>
       <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzF78uAfujGGE9YjhuDuDL-GJrWL4PVhA" }}
        defaultCenter={center}
        defaultZoom={12}
      >
      {locates.map(cd =>  
        <Marker position = {cd}/>
      )}
      </GoogleMapReact>
      
      </div>
    );
  };
  
  


export default Map;