import React, {useState,useEffect} from "react";
import CustomerDetailUpdate from '../updateForms/customerDetailUpdate';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';

import sessionStorage from 'sessionstorage';
import axios from "axios"
import {useNavigate} from "react-router-dom";
import "../../components/css/components.css"
import Occupation from "../../models/Occupation";
import UserDetail from "../../models/UserDetail"
import Customer from '../../models/Customer';
import Address from '../../models/Address';
import Account from '../../models/Account';

const UpdateDetails = () =>{
    const [custId,setCustId] = useState();
    
    const navigate = useNavigate();
    const saveData =  (res) => {
        console.log(JSON.stringify(res.customer));
       sessionStorage.setItem("info", JSON.stringify(res.customer));
      sessionStorage.setItem("address", JSON.stringify(res.addresses))
        sessionStorage.setItem("occupation",JSON.stringify(res.occupation));
        sessionStorage.setItem("accounts",JSON.stringify(res.accounts));
    }

    const findUser = (e) =>{
        // setCustId(custID);
        e.preventDefault();
        const URL = `http://localhost:8080/fetchCustomer/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data)
                
                let val = Object.values(temp[0]["occupation"])
                const occ = new Occupation(...val)
                
                val = Object.values(temp[0]["customer"])
                const cust = new Customer(...val)
                
                let addresses=[]
                val = Object.values(temp[0]["address"])
    
                let permanentAddress = new Address(...val)
                val = Object.values(temp[1]["address"])
    
                let temporaryAddress = new Address(...val)
    
                addresses.push(permanentAddress)
                addresses.push(temporaryAddress)
    
                let accountSet = new Set()
                temp.forEach(element => {
                val = Object.values(element["account"])
                
                let acc = new Account(...val);
                accountSet.add(JSON.stringify(acc))
                });
    
                let accounts = []
                for (const entry of accountSet.values())
                {
                    accounts.push(JSON.parse(entry))
                }
    
                const u = new UserDetail(cust,occ)
    
                u.addAccount(accounts)
                u.addAddress(addresses)
    
                saveData(u)
                setCustId();
                navigate('/welcome/userDetails')
            }).catch(e=>{
                alert(e.message);
                setCustId();

            })

    }

    return(
        <div>
             <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
                <h3 style={{padding: "6%"}}>Find Customer</h3>
              <div className="d-flex justify-content-center">
           
            <form onSubmit={findUser}>
               <div class="group">  
                    <input name='custId' required onChange={e => setCustId(e.target.value)} value={custId}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Enter Customer ID</label>     
                </div>

                <div class="group">
                <button className='button button5' >Find</button>
                </div>
            </form>
            </div>
            </CDBCardBody>
            </CDBCard>
            </CDBContainer>
        </div>
    )
}

export default UpdateDetails;