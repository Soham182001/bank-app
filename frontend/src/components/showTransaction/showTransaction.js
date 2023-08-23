import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBCard, CDBCardBody } from 'cdbreact';


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
            
            <CDBContainer style={{marginLeft: "50%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
            <h3>All Your Transactions</h3>
            <div className="d-flex justify-content-center">
            
            <CDBTable style={{width:"400px"}}>
                <caption>List of Transactions</caption>
                <CDBTableHeader color='primary-info'>

                <tr>
                    <th>Reciever Account No.</th>
                    <th>Sender Account No.</th>
                    <th>Amount</th>
                    <th>Time Stamp</th>
                    <th>Type</th>
                </tr>
                </CDBTableHeader>
                <CDBTableBody>
                {tranx.map((Trans,i)=>
                <tr key={i} style={{backgroundColor:Trans.type === 'deposit'?"green":Trans.type==='withdrawal'?'red':'greenyellow'}}>
                    <td  style={{width:"200 px"} }>{Trans.recieverAccount.accountNo}</td>
                    <td style={{width:"200 px"} }>{Trans.senderAccount.accountNo}</td>
                    <td style={{width:"200 px"} } >{Trans.amount}</td>
                    <td style={{width:"200 px"} } >{Trans.timeStamp}</td>
                    <td style={{width:"200 px"} }>{Trans.type}</td>
                </tr>
                )}
                </CDBTableBody>
                
            </CDBTable>
            </div>
            </CDBCardBody>
          </CDBCard>
          </CDBContainer>
        </div>
    )

}


export default ShowTransaction;