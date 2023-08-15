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
            custId: cust_id,
            accountNo: acc_num,
            balance: 0,
            dateOpened: new Date()
        }
        sessionStorage.setItem("account",account);
        navigate('/')
    };

    return(

        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Account Type (savings/current): </label>
                <input type="text" 
                        name="accountType"
                        value={state.type}
                        {...register("accountType")}
                ></input>

            </form>
        </div>
    )
}

export default CreateAccountPage;