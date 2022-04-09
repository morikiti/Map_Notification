import React, { useState } from "react";

function Input() { 
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const setUsernameValue = (e) => { 
        //eは、イベントハンドラーの略　eには、inputタグに関係する情報が格納
        //e.target.valueで、入力した値にアクセスできる。
        setUsername(e.target.value);
    };
    const setAgeValue = (e) => { 
        setAge(e.target.value);
    };
    const url = 'http://localhost:3001/input_area';
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
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={setUsernameValue} name='name' type='text'/> 
              {/*   {username} */}
                <input value={age} onChange={setAgeValue} name='age' type='text'/>
                {/* {password} */}
                <button type='submit'>SEND</button>
            </form>
        </div>
    )
}
export default Input;