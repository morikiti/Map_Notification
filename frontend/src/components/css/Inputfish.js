import React, { useState } from "react";

function Inputfish() { 
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
   /*  const [species,setSpecies] = useState({ 
        specie:'',
        number:''
    }); */
    const [species,setSpecies] = useState('');
    const [number,setNumber] = useState('');
    const [warming,setWarming] = useState('');

    
    const setUsernameValue = (e) => { 
        //eは、イベントハンドラーの略　eには、inputタグに関係する情報が格納
        //e.target.valueで、入力した値にアクセスできる。
        setUsername(e.target.value);
    };
    
    const setAgeValue = (e) => { 
        setAge(e.target.value);
    };

    const setSpeciesValue = (e) => { 
        setSpecies(e.target.value);
    }

    const setNumberValue = (e) => { 
        setNumber(e.target.value);
        if(number <= 0) { 
            setWarming('The number entered is incorrectr!!');  
        }
    }
    
    


    const url = 'http://localhost:3001/aaaa/aa';
    const header = { 'Content-Type': 'application/json' };

    const handleSubmit = async(e) => { 
        e.preventDefault();
        const data = {lat : username , lng: age};
        const options = { 
            method: 'POST',
            mode:'cors',
            cache: 'no-cache',
            headers: header,
            body: JSON.stringify(data)
        }
       // delete options.headers['Content-Type'];
        await fetch(url,options).then((response)=>{ 
            console.log('finish api call -response:::',response);
            console.log(JSON.stringify(data));
        }).catch((error)=>{ 
            console.log('something wrong:::',error);
        });
    };
    
    const createInputs = () => { 
        return (
            <input value={species} onChange={setSpeciesValue} name='species'/>,
            <input value={number} onChange={setNumberValue} name='number'/>
        )
    }


    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={setUsernameValue} name='name' type='text'/> 
              {/*   {username} */}
                <input value={age} onChange={setAgeValue} name='age' type='text'/>
                {/* {password} */}
                <button type='submit'>SEND</button>
                <button onClick={createInputs}>要素追加</button> {warming}
            </form>
          {/*   <table className="table">
                <thead>
                    <tr>
                        <th>魚種</th>
                        <th>匹数</th>
                    </tr>
                </thead>
            </table> */}
        </div>
    )
}
export default Inputfish;