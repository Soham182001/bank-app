import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import sessionStorage from "sessionstorage";

const AdminLogin = () =>{

    const navigate = useNavigate();
    const baseURL="http://localhost:8080/checkLoginAdmin"


    const [state, setState] =  useState({
        empId: "",
        password: ""
    }) 


    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
            ...prevProps, 
            [name]: value
        }));
    }

    const saveData = (res) => {
        sessionStorage.setItem("info", res);
    }

    const handleSubmit = (e) => {
       
        e.preventDefault();
        console.log(state);
        axios({
            method: 'post',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
            console.log(response.data)
            if(response.data === 'Login Success')
            {
                    saveData(JSON.stringify(state));
                    navigate('/welcomeAdmin');
            }
            else{
                alert("Incorrect Credentials! Please try again!!");            }
            }
        )
        .catch(e => {
            console.log(e);
        })
    }

    return(
        <div>
            <CDBContainer style={{marginTop: "5em", marginLeft: "25em"}}>
                <CDBCard style={{ width: '30rem' }}>
                    <CDBCardBody className="mx-4">
                    <div className="text-center mt-4 mb-2">
                        <p className="h4"> Sign in </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <CDBInput material hint="E-mail" type='text' placeholder="Admin ID"
                                    name='empId'
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
                    <CDBLink className="my-6 mx-0" to="/changepassword">Forgot password?</CDBLink>
                    </div>    
                    </form>
                    <p className="text-center">
                        Not a Admin?{' '}
                        <CDBLink className="d-inline p-0" to="/registerAdmin">
                        Register
                        </CDBLink>
                    </p>
                    </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )
}

export default AdminLogin