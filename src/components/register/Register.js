import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from 'axios';
import './Register.css';

import {useNavigate} from "react-router-dom"
const Register = () => {

    const {
    register,
    handleSubmit
    } = useForm();
    const navigate = useNavigate();

    const baseURL="http://localhost:8080/saveCustomer"

    const onSubmit = (data) => {
        
        data.adhaarNumber = parseInt(data.adhaarNumber)
        console.log(data);
        axios({
            method: 'post',
            url: baseURL,
            data: data
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>CustomerID: </label>
                <input type='text' 
                        name='custId'
                        {...register("custId")}
                        required
                ></input>
                <br></br>
                <label>First Name </label>
                <input type="text" 
                        name="firstName"
                        {...register("firstName")}
                        required
                ></input>
                <br></br>
                <label>Middle Name </label>
                <input type="text" 
                        name="middleName"
                        {...register("middleName")}
                        
                ></input>
                <br></br>
                <label>Last Name </label>
                <input type="text" 
                        name="lastName"
                        {...register("lastName")}
                        required
                ></input>
                <br></br>
                <label>Father Name </label>
                <input type="text" 
                        name="fatherName"
                        {...register("fatherName")}
                        required
                ></input>
                <br></br>
                <label>Phone No </label>
                <input type='text' 
                        name='phone'
                        {...register("phone")}
                        required
                ></input>
                <br></br>
                <label>Email </label>
                <input type='email' 
                        name='email'
                        {...register("email")}
                        required
                ></input>
                <br></br>
                <label>Date Of Birth </label>
                <input type='date' 
                        name='DOB'
                        {...register("DOB")}
                        required
                ></input>
                <br></br>
                <label>Adhaar Number </label>
                <input type="number"
                        name="adhaarNumber"
                        {...register("adhaarNumber")}
                        required
                ></input>
                <br></br>
                <label>Password </label>
                <input type='password' 
                        name='password'
                        {...register("password")}
                        required
                ></input>
                <br></br>
                <input type='submit'></input>
            </form>
            <a href='./login'>Already Signed Up</a>
        </div>
    )
}

export default Register;