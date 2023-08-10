import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {

    const [state, setState] = useState({
        customerID: "",
        fname: "",
        phoneNo: "",
        email: "",
        DOB: "",
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
        e.preventDefault();
        console.log(state);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>CustomerID: </label>
                <input type='text' 
                        name='customerID'
                        value={state.customerID}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Name: </label>
                <input type="text" 
                        name="fname"
                        value={state.fname}
                        onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Phone No: </label>
                <input type='number' 
                        name='phoneNo'
                        value={state.phoneNo}
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
                        name='DOB'
                        value={state.DOB}
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
        </div>
    )
}

export default Register;