import React, {useEffect,useState} from 'react';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBCard, CDBCardBody } from 'cdbreact';
import axios from 'axios';
import './showBalance.css'


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
            <CDBContainer style={{marginLeft: "50%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
                <h3 style={{padding: "6%"}}>Your Accounts</h3>
              <div className="d-flex justify-content-center">
              <CDBTable style={{width:"400px"}}>
                    <caption>List of Accounts</caption>
                    <CDBTableHeader color='primary-info'>
                    <tr>
                        <th >#</th>
                        <th >Account No.</th>
                        <th >Balance</th>
                    </tr>
                    </CDBTableHeader>
                    <CDBTableBody >
                    {balance.map((bal,i)=>
                        <tr key={i}>
                            <td style={{width:"200 px"} }>{i}</td>
                            <td style={{width:"200 px"} }>{bal.accountNo}</td>
                            <td style={{width:"200 px"} }>{bal.balance}</td>
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


export default ShowBalance;
