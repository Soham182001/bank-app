import React, {useState} from "react";
import axios from 'axios';

const Login = () => {

    const baseURL="http://localhost:8080/"

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
        console.log("Hello");
        e.preventDefault();
        console.log(state);
        axios({
            method: 'post',
            url: baseURL,
            data: state
          })
        .then(
            setState((prevProps) => emptyState)
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