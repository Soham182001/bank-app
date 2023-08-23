import React, { useEffect, useState } from 'react';

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Select from 'react-select';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';

const Transact = () => {

    const [accountIds, setAccountIDs] = useState([]);


    useEffect(() => {
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
                (response) => {
                    let temp = []
                    console.log(response.data);
                    let accNums = response.data;
                    console.log(accNums)
                    accNums.map((val, index) => temp.push({ label: val, value: index }))
                    setAccountIDs(temp);
                    console.log(accountIds)
                    console.log(accNums, typeof (accNums))

                }
            )
            .catch(e => {
                console.log(e);
            })
    }, [])
    const [senderAccount, setSenderAccount] = useState('');

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control
    } = useForm();


    const min = 100000000000; // Minimum 12-digit number
    const max = 999999999999; // Maximum 12-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const transactionId = randomNum.toString();

    const onSubmit = (data) => {

        const payload = {
            accountUpdateModel: {

                senderAccount: senderAccount,
                recieverAccount: data.receiverAccount,
                amount: parseInt(data.amount)
            },
            transaction: {
                type: "fund transfer",
                timeStamp: new Date().toISOString().split('T')[0],
                amount: parseInt(data.amount),
                transactionId: transactionId,
                status: "in progress"
            }
        }
        console.log(payload);

        const URL = `http://localhost:8080/transaction`
        axios({
            method: 'post',
            url: URL,
            data: payload
        })
            .then(
                response => {
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

    const style = {
        // background: 'rgba(255, 255, 255, 0.5)',
        position: 'absolute',
        width: '40%',
        left: '40%',
        top: '20%',
        // padding: '8px'
    }
    const group = {
        padding: '5px'
    }
    return (
        <CDBContainer style={style}>
            <CDBCard style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                <CDBCardBody className="mx-4">

                    <div>
                        <h1 style={group}>Transact</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Select
                                name='select1'
                                options={accountIds}

                                onChange={value => { setSenderAccount(value.label); }}
                            />
                            <br />
                            <div style={group}>

                                <label>Receiver account no: </label>
                                <input type="text"
                                    name="receiverAccountNo"
                                    {...register("receiverAccount")}
                                ></input>
                            </div>
                            <br />
                            <div style={group}>

                                <label>Amount in Rs: </label>
                                <input type="text"
                                    name="amount"
                                    {...register("amount")}
                                ></input>
                            </div>
                            < br />
                            <div style={group}>

                                <input type="submit" value="Next"

                                ></input>
                            </div>
                        </form>
                    </div>
                </CDBCardBody>
            </CDBCard>
        </CDBContainer>

    )
}

export default Transact;