import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';

const ShowBalanceAdmin = () =>{

    const [custId, setCustId] = useState("");
    const [account, setAccount] = useState([]);
    const [type,setType]  = useState('');

    const handleFetch = () => {
        if(type == 'customer id') {
            fetchBalanceCustId();
        }
        else if(type == 'account id') {
                fetchBalanceAccId();
        }
    }
    const fetchBalanceAccId = () => {
        const URL = `http://localhost:8080/checkBalance/${custId.target.value}`
    }
    const fetchBalanceCustId = () =>{
        const URL = `http://localhost:8080/checkBalance/${custId.target.value}`
        console.log(custId.target.value);
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
;                let temp= (response.data);
                console.log(temp);
                setAccount(temp);
            }
        )
        .catch(e => {
            console.log(e);
        })
    }
    const queryTypes=[{label:"customer id",value:1},{label:"account id",value:2}];


    return (
        <div>
            <h1>Check Balance Using Customer Id</h1>
            <Select
                name='select2'
                options={queryTypes}
                onChange={value=>setType(value.label)}
               />
            <input name='custId' placeholder='Enter Customer Id' onChange={e => setCustId(e)}></input>
            <button onClick={handleFetch}>Check Balance</button>
            
            { account.length > 0 ? 
            <table>
                <tbody>
                <tr>
                    <th>Account No.</th>
                    <th>Balance</th>
                </tr>
                {account.map((bal,i)=>
                <tr key={i}>
                    <td>{bal.accountNo}</td>
                    <td>{bal.balance}</td>
                </tr>
                )}
                </tbody>
            </table>
            : 
            <div>Enter Customer Id to search records!</div>
            }
            
       </div>
    )
}

export default ShowBalanceAdmin