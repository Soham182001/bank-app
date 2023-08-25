import React, { useState } from 'react';
import { CDBBtnGrp, CDBCard, CDBCardBody, CDBContainer, CDBInput, CDBBtn} from 'cdbreact'

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const AddOccupation = () => {


    const navigate = useNavigate();
    const {
        register,
        handleSubmit
    } = useForm();

    const accType = JSON.parse(JSON.stringify(sessionStorage.getItem("account"))).accountType;
    const onSubmit = (data) => {
        console.log(data);
        const occupation = {
            occupationType: data.occupationType,
            sourceOfIncome: data.sourceOfIncome,
            grossAnnualSalary: data.grossAnnualSalary
        }
        console.log(occupation)
        sessionStorage.setItem("occupation", JSON.stringify(occupation));
        navigate('/welcome/addPermanentAddress')
    };

    return (

        <div>
            <CDBContainer style={{ marginLeft: "40%", marginTop: "10%" }}>
                <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
                    <CDBCardBody>

                        <h1>Creating a {accType} Account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>Occupation Type </div>
                            <CDBInput type="text"
                                {...register("occupationType")}
                            ></CDBInput>

                            <br></br>

                            <div>Source Of Income </div>
                            <CDBInput type="text"
                                {...register("sourceOfIncome")}
                            ></CDBInput>

                            <br></br>

                            <div>Gross Annual Salary  </div>
                            <CDBInput type="number"
                                {...register("grossAnnualSalary")}
                            ></CDBInput>

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

export default AddOccupation;