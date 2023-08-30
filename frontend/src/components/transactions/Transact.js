import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Select from 'react-select';
import { CDBCard, CDBCardBody, CDBContainer } from 'cdbreact';
import '../../components/css/components.css'
import SweetAlert2 from 'react-sweetalert2';


const Transact = () => {

    const [accountIds, setAccountIDs] = useState([]);
    const [flag, setFlag] = useState(-1);
    const [swalProps, setSwalProps] = useState({});

    useEffect(() => {
        console.log("Hello")
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        const custId = data.custId;

        const URL = `http://localhost:8080/fetchAccounts/${custId}`
        axios({
            method: 'get',
            url: URL,
        })
            .then(
                (response) => {
                    let temp = []
                    let accNums = response.data;
                    accNums.map((val, index) => temp.push({ label: val, value: index }))
                    setAccountIDs(temp);
                }
            )
            .catch(e => {
                console.log(e);
            })
    }, [])
    const [senderAccount, setSenderAccount] = useState('');

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

        console.log(data.receiverAccount === senderAccount);
        if(data.receiverAccount === senderAccount)
        {
            console.log(data);
            setFlag(-1);
            setSwalProps({
                show: true,
                title: 'Status',
            });

            return;

        }
        else{
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

        const URL = `http://localhost:8080/transaction`
        axios({
            method: 'post',
            url: URL,
            data: payload
        })
            .then(
                response => {
                    setFlag(1);
                    setSwalProps({
                        show: true,
                        title: 'Status',
                    });
                }
            )
            .catch(e => {
                setFlag(-1);
                setSwalProps({
                    show: true,
                    title: 'Status',
                });
                console.log(e);
            })
        }
    };

    
    return (
        <div>
            <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
                <h3 style={{padding: "6%"}}>Transfer Funds</h3>
              <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container>

                    <div class="group">
                        <Select
                            placeholder="Select Your Account"
                            options={accountIds}
                            onChange={value => { setSenderAccount(value.label); }}
                        />
                    </div>

                    <div class="group">      
                        <input type="text" required  name="receiverAccountNo"
                                {...register("receiverAccount")} />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Receiver Account</label>
                    </div>

                    <div class="group">      
                        <input type="text" required name="amount"
                                {...register("amount")}/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Amount ( &#x20b9; )</label>
                    </div>
                
                    <div class="group">
                    <button className='button button5' >Transfer</button>
                        
                    </div>
                    </Container>
                </form>
              </div>
            </CDBCardBody>
          </CDBCard>
          </CDBContainer>
          { flag == 1 ? 
            <div>
                <SweetAlert2 {...swalProps} icon='success'
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                    <h4>Transaction Successful!</h4>
                </SweetAlert2>
            </div>
            : 
            <div>
                <SweetAlert2 {...swalProps} icon='error'
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                <h4>Transaction Failed!</h4>
                </SweetAlert2>
            </div>
          }
        </div>
    )
}

export default Transact;