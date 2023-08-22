import React, { useState } from 'react';

import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const CreateAccountPage = () =>{


    const navigate = useNavigate();
    const {
        register,
        handleSubmit
        } = useForm();
    
    const cust_id = JSON.parse(sessionStorage.getItem("info")).custId;

      const min = 100000000000; // Minimum 12-digit number
      const max = 999999999999; // Maximum 12-digit number
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const acc_num = randomNum.toString();

    const onSubmit = (data)=>{

        const account = {
            type : data.accountType,
            accountNo: acc_num,
            balance: 0,
            dateOpened: new Date().toISOString().split('T')[0]
        }
        sessionStorage.setItem("account",JSON.stringify(account));
        navigate('/welcome/addOccupation')
    };

    return(

        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Account Type (savings/current): </label>
                <input type="text" 
                        name="accountType"
                        {...register("accountType")}
                ></input>
                <br/>
                <input type="submit" value="Next"
                ></input>

                
            </form>
        </div>
    )
}

export default CreateAccountPage;