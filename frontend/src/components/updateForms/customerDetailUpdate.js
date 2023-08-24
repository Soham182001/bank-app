import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import {useNavigate} from "react-router-dom"
import Customer from '../../models/Customer'
const CustomerDetailUpdate = () => {

        const customer=JSON.parse(sessionStorage.getItem("info"))
        const navigate = useNavigate();

        const [state, setState] = useState(
                new Customer(...Object.values(customer))
        ) 

        useEffect(()=>{
                // setState(new Customer(...Object.values(customer)))
                console.log(state)
        },[])

        const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
                ...prevProps, 
                [name]: value
        }));
        }
        // const custId = JSON.parse(sessionStorage.getItem("info")).custId;
    const baseURL=`http://localhost:8080/updateCustomer/${customer.custId}`

    console.log(baseURL);
    const handleSubmit = (e) => {
        console.log("Hello");
        e.preventDefault();
        console.log(state);
        axios({
            method: 'put',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
                alert("Customer updated success")
                navigate('/welcome')
            }
        )
        .catch(e => {
            alert(e.message);
            console.log(e);
        })
    }

    return (
        <div>
                <CDBContainer style={{marginTop: "5em", marginLeft: "15em"}}>
                <CDBCard style={{ width: '30rem' }}>
                        <CDBCardBody className="mx-4">
                        <form onSubmit={handleSubmit}>
                        <div className="text-center mt-4 mb-2">
                        <p className="h4"> User Details </p>
                        </div>
                        <div className="form-flex-row mb-n4">
                        <div className="col">
                                <CDBInput material  type='text'  
                                name='custId'
                                onChange={handleInputChange}
                                disabled
                                value={state.custId}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='First Name'
                                name="firstName"
                                onChange={handleInputChange}
                                value={state.firstName}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material type="text" placeholder='Middle Name'
                                name="middleName"
                                value={state.middleName}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='Last Name'
                                name="lastName"
                                value={state.lastName}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='Father Name'
                                name="fatherName"
                                value={state.fatherName}
                                onChange={handleInputChange}
                                required/>
                        </div>
                        <div className='col'>
                                <label id='dob' >
                                {new Date(state.DOB).toLocaleString()}</label>
                        </div>
                        </div>
                        <CDBInput material  type="email" placeholder='Email'
                                name="email"
                                onChange={handleInputChange}
                                value={state.email}
                                required/>
                        <CDBInput material  type="text" placeholder='Phone Number'
                                name="phone"
                                value={state.phone}
                                onChange={handleInputChange}
                                required/>
                        <CDBInput material  type="number" placeholder='Adhaar Number'
                                name="adhaarNumber"
                                onChange={handleInputChange}
                                value={state.adhaarNumber}
                                disabled
                                required/>
                      
                        <CDBBtn color="dark" className="btn-block my-3 mx-8" type='submit' id="submit" >
                                 Update
                        </CDBBtn>
                        </form>
                   
                        </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )
}

export default CustomerDetailUpdate;