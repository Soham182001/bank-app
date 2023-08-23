import React, {useEffect,useState} from 'react';
import axios from 'axios';


const ShowBalance = () =>{
    const [balance,setBalance]=useState([]);
    useEffect(()=>{
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        console.log("hello")
        const custId = data.custId;
        
        const URL = `http://localhost:8080/checkBalance/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                console.log(temp);
                setBalance(temp)
            }
        )
        .catch(e => {
            console.log(e);
        })
        },[])

    return(
        <div>
            <h1>All Your Accounts</h1>
            <table>
                <tbody>
                <tr>
                    <th>Account No.</th>
                    <th>Balance</th>
                </tr>
                {balance.map((bal,i)=>
                <tr key={i}>
                    <td>{bal.accountNo}</td>
                    <td>{bal.balance}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}


export default ShowBalance;