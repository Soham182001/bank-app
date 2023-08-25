import React, {useEffect,useState} from 'react';
import axios from 'axios';

import Occupation from "../../models/Occupation";
import UserDetail from "../../models/UserDetail"
import Customer from '../../models/Customer';
import Address from '../../models/Address';
import Account from '../../models/Account'
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBCard, CDBCardBody } from 'cdbreact';

const AccountDetails = () =>{
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        // console.log("hello")
        const custId = data.custId;
        
        const URL = `http://localhost:8080/fetchCustomer/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                
                let val = Object.values(temp[0]["occupation"])
                const occ = new Occupation(...val);
                
                val = Object.values(temp[0]["customer"])
                const cust = new Customer(...val);
                
                let addresses=[]
                val = Object.values(temp[0]["address"])

                let permanentAddress = new Address(...val);
                val = Object.values(temp[1]["address"])

                let temporaryAddress = new Address(...val);

                addresses.push(permanentAddress)
                addresses.push(temporaryAddress)

                let accountSet = new Set()
                temp.forEach(element => {
                val = Object.values(element["account"])
                
                let acc = new Account(...val);
                accountSet.add(JSON.stringify(acc));
                });

                let accounts = []
                for (const entry of accountSet.values())
                {
                    accounts.push(JSON.parse(entry));
                }

                console.log(accounts);

                const u = new UserDetail(cust,occ);

                u.addAccount(accounts);
                u.addAddress(addresses)

                console.log(u);

                setUserData(u);
                
                console.log(Object.keys(userData));
                console.log(Object.keys(userData.customer));
            }
        )
        .catch(e => {
            console.log(e);
        })
        },[])

    return(
        <div>
         <div>{userData ?  ( <div> 

                
            <CDBContainer style={{marginLeft: "35%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>  
                
            <h3>Account Details</h3>
            <div className="d-flex justify-content-center">
                
            <CDBTable style={{width:"400px"}}>
                <caption>List of Transactions</caption>
                <CDBTableHeader color='primary-info'>

                        <tr>
                        {Object.keys(userData.accounts[0]).map((value,i)=>{
                        
                        return  <th key={i}> {value === "dateClosed"? "Status":value} </th>
                     })}

                        </tr>
                </CDBTableHeader>

                        {userData.accounts.map((acc,index)=>{
                           return ( <tr key = {index}>
                            {Object.values(acc).map((value,i)=>{
                            
                            return  <td key={i}> {i === 3 ? (value === null ? 'active' : 'suspended'):value} </td>
                         })}
                            </tr>);
                        })}
                        </CDBTable>
                </div>
            </CDBCardBody>
          </CDBCard>
          </CDBContainer>
                
            </div>)
           :        <h3>No data yet</h3>} </div>
  
            
        </div>
    )

}


export default AccountDetails;