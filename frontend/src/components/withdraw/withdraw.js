import React, { useEffect, useState } from 'react';

import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Select from 'react-select';

const Withdraw= () =>{

const [accountIds,setAccountIDs]=useState([]);
                

    useEffect(()=>{
        console.log("Hello")
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        console.log("hello")
        const custId = data.custId;
        
        const URL = `http://localhost:8080/fetchAccounts/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
                let temp=[]
                console.log(response.data);
                let accNums=response.data;
                console.log(accNums)
                accNums.map((val,index)=>temp.push({label:val,value:index}))
                setAccountIDs(temp);
                console.log(accountIds)
                console.log(accNums,typeof(accNums))

            }
        )
        .catch(e => {
            console.log(e);
        })
        },[])
    const [senderAccount,setSenderAccount] = useState('');
    const [type,setType]  = useState('');

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control
        } = useForm();

        


    const transactTypes=[{label:"withdrawal",value:1},{label:"deposit",value:2}];

      const min = 100000000000; // Minimum 12-digit number
      const max = 999999999999; // Maximum 12-digit number
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const transactionId = randomNum.toString();

    const onSubmit = (data)=>{

        const payload = {
            accountUpdateModel:{
                
            senderAccount: senderAccount,
            recieverAccount: senderAccount,
            amount: parseInt(data.amount)
            },
          transaction:{  
            type : type,
            timeStamp: new Date().toISOString().split('T')[0],
            amount:parseInt(data.amount),
            transactionId:transactionId,
            status:"in progress"
          }
        }

        const URL = `http://localhost:8080/transaction`
        axios({
            method: 'post',
            url: URL,
            data:payload
          })
        .then(
            response=>{
                console.log(response.data);
                
                alert("Transaction done success");
                navigate("/welcome")

            }
        )
        .catch(e => {
            alert(e.message);
            console.log(e);
        })
    };


    return(

        <div className='wrapper'>
            <h1>Withdrawal/Deposit</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Select
               name='select1'
                options={accountIds}
                
                onChange={value=>{setSenderAccount(value.label);}}
               />
                <Select
                name='select2'
                options={transactTypes}
                onChange={value=>setType(value.label)}
               />
                <br/>
                <br/>
 
                <label>Amount in Rs: </label>
                <input type="text" 
                        name="amount"
                        {...register("amount")}
                ></input>
                    <input type="submit" value="Next"
                
                ></input>
            </form>
        </div>
    )
}

export default Withdraw;