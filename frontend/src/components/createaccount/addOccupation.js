import React, { useState } from 'react';

import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const AddOccupation = () =>{


    const navigate = useNavigate();
    const {
        register,
        handleSubmit
        } = useForm();
    
    const accType = JSON.parse(sessionStorage.getItem("account")).accountType;
    const onSubmit = (data)=>{

        const account = {
            type : data.accountType,
            custId: cust_id,
            accountNo: acc_num,
            balance: 0,
            dateOpened: new Date()
        }
        sessionStorage.setItem("account",account);
        navigate('/addPermanentAddress')
    };

    return(

        <div>
            <h1>Creating a {accType} Account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Occupation Type (savings/current) </label>
                <input type="text" 
                        name="occupationType"
                        {...register("occupationType")}
                ></input>

                <br></br>

                <label>Source Of Income </label>
                <input type="text" 
                        name="sourceOfIncome"
                        {...register("sourceOfIncome")}
                ></input>

                <br></br>

                <label>Gross Annual Salary  </label>
                <input type="number" 
                        name="grossAnnualSalary"
                        {...register("grossAnnualSalary")}
                ></input>

                <br></br>

                <input type="submit" 
                >Next</input>
                
            </form>
        </div>
    )
}

export default AddOccupation;