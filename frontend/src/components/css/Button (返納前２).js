import GoogleMapReact from 'google-map-react';
import  React,{ useState  } from 'react';
const Button = () => { 
    //const [inputlat, setInputlat] = useState('');
    //const [inputlng, setInputlng] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    //const data = {lat : lat, lng : lng};
    const containerStyle = {
        height: "80vh",
        width: "100%",
    };

    const defaultLatLng = {
        lat: 35.7022589,
        lng: 139.7744733,
      };
    const setLatLng = ({ x, y, lat, lng, e }) => {
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

    

    return (
        <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAzF78uAfujGGE9YjhuDuDL-GJrWL4PVhA" }}
        defaultCenter={defaultLatLng}
        defaultZoom={12}
        onClick={setLatLng}
      ></GoogleMapReact>
      {<p>緯度:{lat}</p>} {<p>経度:{lng}</p>}
            <form onSubmit={handleSubmit}>
                <input value={lat}  name='lat' type='text'/>
                <input value={lng} name='lng' type='text'/>
                <button type='submit'>SEND</button>
            </form>
            <button onClick>sample</button>
        </div>
    );
};

export default Button;