import React, {useState} from 'react';
import axios from 'axios';


const SuspendAccount = () => {

    const [accountNo, setAccountNo] = useState("");

    const suspendAccount = () =>{
        const URL = `http://localhost:8080/suspendAccount/${accountNo}`;
        console.log(URL)
        axios({
            method: 'put',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                console.log(temp);
                setAccountNo("");
            }
        )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            <h1>Suspend Account Using Account Number</h1>
            
            <input name='accountNo' value={accountNo} placeholder='Enter Account No' onChange={e => setAccountNo(e.target.value)}></input>
            <button onClick={suspendAccount}>Suspend Account</button>
        </div>
    )
}

export default SuspendAccount;