import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

import {useNavigate} from "react-router-dom"
const Register = () => {

    const navigate = useNavigate();

    const baseURL="http://localhost:8080/saveCustomer"

    const [state, setState] = useState({
        custId: "",
        name: "",
        phone: "",
        email: "",
        dob: "",
        address: "",
        password: ""
    }) 

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
            ...prevProps, 
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        console.log("Hello");
        e.preventDefault();
        console.log(state);
        axios({
            method: 'post',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
                navigate('/login')
            }
        )
        .catch(e => {
            alert(e.message);
            console.log(e);
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>CustomerID: </label>
                <input type='text' 
                        name='custId'
                        value={state.custId}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Name: </label>
                <input type="text" 
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Phone No: </label>
                <input type='number' 
                        name='phone'
                        value={state.phone}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Email: </label>
                <input type='email' 
                        name='email'
                        value={state.email}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Date Of Birth: </label>
                <input type='date' 
                        name='dob'
                        value={state.dob}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Address: </label>
                <input type="text"
                        name="address"
                        value={state.address}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Password: </label>
                <input type='password' 
                        name='password'
                        value={state.password}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <input type='submit'></input>
            </form>
            <a href='./login'>Already Signed Up</a>
        </div>
    )
}

export default Register;