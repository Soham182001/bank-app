import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import sessionStorage from "sessionstorage";
import Occupation from "../../models/Occupation";
import UserDetail from "../../models/UserDetail"
import Customer from '../../models/Customer';
import Address from '../../models/Address';
import Account from '../../models/Account';

const Login = () => {


    const navigate = useNavigate();
    const baseURL="http://localhost:8080/checkLogin"


    const [state, setState] =  useState({
        custId: "",
        password: ""
    }) 


    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
            ...prevProps, 
            [name]: value
        }));
    }
    const saveData =  (res) => {
        console.log(JSON.stringify(res.customer));
       sessionStorage.setItem("info", JSON.stringify(res.customer));
      sessionStorage.setItem("address", JSON.stringify(res.addresses))
        sessionStorage.setItem("occupation",JSON.stringify(res.occupation));
        sessionStorage.setItem("accounts",JSON.stringify(res.accounts));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: baseURL,
            data: state
          })
        .then(
          async  response=>{
            if(response.data === 'Login Success')
            {

            const URL = `http://localhost:8080/fetchCustomer/${state.custId}`
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

                    navigate("/welcome");
                }
            ).catch(e=>{
                console.log(e)
            })

          
            }
            else{
                alert("Incorrect Credentials! Please try again!!");            }
            }
        )
        .catch(e => {
            alert(e.response.data.message);
            console.log(e);
        })
    }

    return (
        <div>
            
                <CDBContainer style={{marginTop: "5em", marginLeft: "25em"}}>
                <CDBCard style={{ width: '30rem' }}>
                    <CDBCardBody className="mx-4">
                    <div className="text-center mt-4 mb-2 flex">
                        <p className="h4"> Sign in </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <CDBInput material hint="E-mail" type='text' placeholder="Customer ID"
                                    name='custId'
                                    value={state.custId}
                                    onChange={handleInputChange} />
                    <CDBInput material hint="Password" type="password" placeholder="Password" 
                                    name='password'
                                    value={state.password}
                                    onChange={handleInputChange}/>
                    <div>
                    <CDBBtn color="dark" className="btn-block my-3 mx-0 " type="submit">
                        Sign in
                    </CDBBtn>
                    <CDBBtn color="dark" className="btn-block my-3 mx-0 " onClick={()=>{navigate("/loginAdmin")}} > <h6>Login as Admin</h6> </CDBBtn>
                    <CDBLink className="my-6 mx-0" to="/changepassword">Forgot password?</CDBLink>
                    </div>    
                    </form>
                    <p className="text-center">
                        Not a customer?{' '}
                        <CDBLink className="d-inline p-0" to="/register">
                        Register
                        </CDBLink>
                    </p>
                    </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )

}

export default Login;