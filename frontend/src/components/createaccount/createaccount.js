import React, { useState } from 'react';
import axios from 'axios';

const CreateAccountPage = () =>{
    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);
    const cust_id = data.custId;
    // const cust_id = 1
    const baseURL="http://localhost:8080/createaccount/";

    // const [randomNumber, setRandomNumber] = useState('');

    // const generateRandomNumber = () => {
      const min = 100000000000; // Minimum 12-digit number
      const max = 999999999999; // Maximum 12-digit number
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const acc_num = randomNum.toString();
    //   setRandomNumber(randomNum.toString());
    // };

    // generateRandomNumber();



    const [state, setState] = useState({
        type: "",
        custId: cust_id,
        accountNo: acc_num,
        balance: 0,
        dateOpened: new Date(),
        dateClosed: ""
    });




    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
            ...prevProps, 
            [name]: value
        }));
    }

    const handleSubmit = (e)=>{
        var url = baseURL + state.custId;
        e.preventDefault();
        axios({
            method: 'post',
            url: url,
            data: state
        })

    };

    return(

        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Account Type (savings/current): </label>
                <input type="text" 
                        name="account_type"
                        value={state.type}
                        onChange={handleInputChange}
                ></input>

            </form>
        </div>
    )
}

export default CreateAccountPage;