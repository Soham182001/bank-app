import React, {useState} from 'react';
import axios from 'axios';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import {useNavigate} from "react-router-dom"
import sessionStorage from 'sessionstorage';

const Register = () => {

        const navigate = useNavigate();

        const [state, setState] = useState({
                custId: "",
                firstName: "",
                phone: "",
                email: "",
                DOB: "",
                password: "",
                adhaarNumber: "",
                middleName: "",
                lastName: "",
                fatherName: ""
        }) 

        const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
                ...prevProps, 
                [name]: value
        }));
        }

    const baseURL="http://localhost:8080/saveCustomer"

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem("info",JSON.stringify(state))
        console.log(state);
        axios({
            method: 'post',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
                navigate('/welcome/createAccount')
            }
        )
        .catch(e => {
            alert(e.message);
            console.log(e);
        })
    }

    return (
        <div>
                <CDBContainer style={{marginTop: "5em", marginLeft: "25em"}}>
                <CDBCard style={{ width: '30rem' }}>
                        <CDBCardBody className="mx-4">
                        <form onSubmit={handleSubmit}>
                        <div className="text-center mt-4 mb-2">
                        <p className="h4"> Sign up </p>
                        </div>
                        <div className="form-flex-row mb-n4">
                        <div className="col">
                                <CDBInput material hint="Customer ID" type='text' placeholder='Customer ID' 
                                name='custId'
                                onChange={handleInputChange}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material hint="First name" type="text" placeholder='First Name'
                                name="firstName"
                                onChange={handleInputChange}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material hint="Middle name" type="text" placeholder='Middle Name'
                                name="middleName"
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="col">
                                <CDBInput material hint="Last name" type="text" placeholder='Last Name'
                                name="lastName"
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="col">
                                <CDBInput material hint="Father name" type="text" placeholder='Father Name'
                                name="fatherName"
                                onChange={handleInputChange}
                                required/>
                        </div>
                        <div className='col'>
                               
                                <CDBInput id='dob' type='date' material
                                name='DOB'
                                onChange={handleInputChange}
                                required/>
                        </div>
                        </div>
                        <CDBInput material hint="Email" type="email" placeholder='Email'
                                name="email"
                                onChange={handleInputChange}
                                required/>
                        <CDBInput material hint="Phone" type="text" placeholder='Phone Number'
                                name="phone"
                                onChange={handleInputChange}
                                required/>
                        <CDBInput material hint="Adhaar" type="number" placeholder='Adhaar Number'
                                name="adhaarNumber"
                                onChange={handleInputChange}
                                required/>
                        <CDBInput material hint="Password" type="password" placeholder='Password'
                                name="password"
                                onChange={handleInputChange}
                                required/>
                        <CDBBtn color="dark" className="btn-block my-3 mx-0" type='submit'>
                        Sign up
                        </CDBBtn>
                        </form>
                        <p className="text-center m-0">
                        Already have an account?{' '}
                        <CDBLink className="d-inline p-0" to="/login">
                        Sign In
                        </CDBLink>
                        </p>
                        </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )
}

export default Register;