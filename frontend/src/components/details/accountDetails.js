import React, {useEffect,useState} from 'react';
import axios from 'axios';

import Occupation from "../../models/Occupation";
import UserDetail from "../../models/UserDetails"
import Customer from '../../models/Customer';
import Address from '../../models/Address';
import Account from '../../models/Account'
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
            <h1>Account Details</h1>
         <div>{userData ?  ( <div> 
         
                <table>
                    <tbody>
                        <tr>
                        {Object.keys(userData.accounts[0]).map((value,i)=>{
                        
                        return  <th key={i}> {value} </th>
                     })}
                        </tr>
                        {userData.accounts.map((acc,index)=>{
                           return ( <tr key = {index}>
                            {Object.values(acc).map((value,i)=>{
                            
                            return  <td key={i}> {value} </td>
                         })}
                            </tr>);
                        })}
                        
                    </tbody>
                </table>
                
                
            </div>)
           :        <h3>No data yet</h3>} </div>
  
            
        </div>
    )

}


export default AccountDetails;