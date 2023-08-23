import React, {useEffect,useState} from 'react';
import axios from 'axios';


const ShowTransaction = () =>{
    const [tranx,setTranx]=useState([]);
    useEffect(()=>{
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        console.log("hello")
        const custId = data.custId;
        
        const URL = `http://localhost:8080/fetchTransactions/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                console.log(temp);
                setTranx(temp)
            }
        )
        .catch(e => {
            console.log(e);
        })
        },[])

    return(
        <div>
            <h1>All Your Transactions</h1>
            <table>
                <tbody>
                <tr>
                    <th>Reciever Account No.</th>
                    <th>Sender Account No.</th>
                    <th>Amount</th>
                    <th>Time Stamp</th>
                    <th>Type</th>
                </tr>
                {tranx.map((Trans,i)=>
                <tr key={i}>
                    <td>{Trans.recieverAccount.accountNo}</td>
                    <td>{Trans.senderAccount.accountNo}</td>
                    <td>{Trans.amount}</td>
                    <td>{Trans.timeStamp}</td>
                    <td>{Trans.type}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )

}


export default ShowTransaction;