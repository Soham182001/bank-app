import React from 'react';
import { CDBBtnGrp, CDBCard, CDBCardBody, CDBContainer, CDBBtn } from 'cdbreact'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../../components/css/components.css'

const CreateAccountPage = () => {
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

    const onSubmit = (data) => {

        const account = {
            type: data.accountType,
            accountNo: acc_num,
            balance: 0,
            dateOpened: new Date().toISOString().split('T')[0]
        }
        sessionStorage.setItem("account", JSON.stringify(account));
        navigate('/welcome/addOccupation')
    };

    return (

        <div>
            <CDBContainer style={{ marginLeft: "40%", marginTop: "10%" }}>
                <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
                    <CDBCardBody>

                        <h1>Create an Account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div>Account Type (savings/current): </div>
                            {/* <CDBInput type='text' {...register("accountType")} /> */}
                            <div className='d-flex justify-content-center'>
                                <div className='group'>

                                    <input type="text"
                                        name="accountType"
                                        {...register("accountType")}
                                    ></input>
                                </div>
                            </div>
                            <br />
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

export default CreateAccountPage;