import React from 'react';
import { CDBBtnGrp, CDBCard, CDBCardBody, CDBContainer, CDBBtn } from 'cdbreact'

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import '../../components/css/components.css'

const AddOccupation = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit
    } = useForm();

    const accType = JSON.parse(JSON.stringify(sessionStorage.getItem("account"))).accountType;
    const onSubmit = (data) => {
        const occupation = {
            occupationType: data.occupationType,
            sourceOfIncome: data.sourceOfIncome,
            grossAnnualSalary: data.grossAnnualSalary
        }
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
                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Occupation Type </div>
                                    <input type="text"
                                        name="occupationType"
                                        {...register("occupationType")}
                                    ></input>
                                </div>

                                <br></br>
                            </div>
                            <div className='d-flex justify-content-center'>


                                <div className='group'>

                                    <div>Source Of Income </div>
                                    <input type="text"
                                        name="sourceOfIncome"
                                        {...register("sourceOfIncome")}
                                    ></input>
                                </div>
                            </div>

                            <br></br>

                            <div className='d-flex justify-content-center'>

                                <div className='group'>

                                    <div>Gross Annual Salary  </div>
                                    <input type="number"
                                        name="grossAnnualSalary"
                                        {...register("grossAnnualSalary")}
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

export default AddOccupation;