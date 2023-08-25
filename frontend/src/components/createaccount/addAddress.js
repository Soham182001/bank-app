import React, { useState } from 'react';
import { CDBBtnGrp, CDBCard, CDBCardBody, CDBContainer, CDBInput, CDBBtn } from 'cdbreact'

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import '../../components/css/components.css'
const Address = (props) => {


    const navigate = useNavigate();
    const {
        register,
        handleSubmit
    } = useForm();

    const accType = JSON.parse(JSON.stringify(sessionStorage.getItem("account"))).accountType;

    const addressType = props.type;
    const onSubmit = (data) => {

        let addresses;
        const address = {
            addressType: addressType,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            landmark: data.landmark,
            state: data.state,
            city: data.city,
            pincode: data.pincode,
        }
        if (addressType === "Permanent")
            addresses = []
        else {
            addresses = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem("address"))))
        }
        addresses.push(address);

        sessionStorage.setItem("address", JSON.stringify(addresses));

        if (addressType === "Permanent")
            navigate('/welcome/addTemporaryAddress')
        else {
            const sessionData = JSON.parse(JSON.stringify(sessionStorage))
            const custId = JSON.parse(sessionData.info).custId;
            const data = {
                occupation: JSON.parse(sessionData.occupation),
                account: JSON.parse(sessionData.account),
                address: JSON.parse(sessionData.address)
            }
            const URL = `http://localhost:8080/createAccount/${custId}`;
            console.log(data);

            axios({
                method: 'post',
                url: URL,
                data: data
            })
                .then(
                    response => {
                        console.log(response.data);
                        navigate('/welcome')
                    }
                )
                .catch(e => {
                    alert(e.message);
                    console.log(e);
                })


        }
        // navigate('/reviewPage')
    };

    return (

        <div>
            <CDBContainer style={{ marginLeft: "40%", marginTop: "10%" }}>
                <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
                    <CDBCardBody>

                        <h1>Creating a {accType} Account</h1>
                        <h3>{addressType} Address Details</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Address Line 1 </div>
                                    <input type="text"
                                        name="addressLine1"
                                        {...register("addressLine1")}
                                        required
                                    ></input>
                                </div>
                            </div>

                            <br></br>
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Address Line 2</div>
                                    <input type="text"
                                        name="addressLine2"
                                        {...register("addressLine2")}
                                    ></input>
                                </div>
                            </div>


                            <br></br>
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Landmark</div>
                                    <input type="text"
                                        name="landmark"
                                        {...register("landmark")}
                                    ></input>
                                </div>
                            </div>

                            <br></br>
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>State</div>
                                    <input type="text"
                                        name="state"
                                        {...register("state")}
                                    ></input>
                                </div>
                            </div>

                            <br></br>

                            <div className='d-flex justify-content-center'>
                                <div className='group'>


                                    <div>City</div>
                                    <input type="text"
                                        name="city"
                                        {...register("city")}
                                    ></input>
                                </div>
                            </div>

                            <br></br>
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Pincode  </div>
                                    <input type="number"
                                        name="pincode"
                                        {...register("pincode")}
                                    ></input>
                                </div>
                            </div>

                            <br></br>
                            <CDBBtnGrp>
                                <CDBBtn>

                                    <input type="submit" value="Next"
                                    ></input>
                                </CDBBtn>
                            </CDBBtnGrp>

                        </form>
                    </CDBCardBody>
                </CDBCard>
            </CDBContainer>
        </div>
    )
}

export default Address;


