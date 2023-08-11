import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Login = () => {

    const navigate = useNavigate();
    const baseURL="http://localhost:8080/checkLogin"

    const emptyState = {
        custId: "",
        password: ""
    }

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
                    navigate('/')
            }
            else{
                alert("Incorrect Credentials! Please try again!!");
            }
            }
        )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>CustomerID: </label>
                <input type='text' 
                        name='custId'
                        value={state.custId}
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
            <a href="./register">Haven't Signed Up Yet?</a>
        </div>
    )

}

export default Login;