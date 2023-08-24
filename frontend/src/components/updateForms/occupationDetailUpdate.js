import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import {useNavigate} from "react-router-dom"
import Occupation from '../../models/Occupation';
const OccupationDetailUpdate = () => {

        const customer  = JSON.parse(sessionStorage.getItem("info"));
        const occupation=JSON.parse(sessionStorage.getItem("occupation"))
        const navigate = useNavigate();

        const [state, setState] = useState(
                new Occupation(...Object.values(occupation))
        ) 

        useEffect(()=>{
                // setState(new Customer(...Object.values(customer)))
                console.log(state)
        },[])

        const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
                ...prevProps, 
                [name]: value
        }));
        }
        // const custId = JSON.parse(sessionStorage.getItem("info")).custId;
    const baseURL=`http://localhost:8080/updateOccupation/${customer.custId}`

    console.log(baseURL);
    const handleSubmit = (e) => {
        console.log("Hello");
        e.preventDefault();
        console.log(state);
        axios({
            method: 'put',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
                alert("Occupation updated success")
                navigate('/welcome')
            }
        )
        .catch(e => {
            alert(e.message);
            console.log(e);
        })
    }

    return (
        <div>
                <CDBContainer style={{marginTop: "5em", marginLeft: "15em"}}>
                <CDBCard style={{ width: '30rem' }}>
                        <CDBCardBody className="mx-4">
                        
                        <form onSubmit={handleSubmit}>
                        <div className="text-center mt-4 mb-2">
                        <p className="h4"> Occupation Details </p>
                        </div>
                        <div className="form-flex-row mb-n4">
                        <div className="col">
                                <CDBInput material  type='text'  placeholder='Occupation Type' 
                                name='occupationType'
                                onChange={handleInputChange}
                                value={state.occupationType}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='Source of Income'
                                name="sourceOfIncome"
                                onChange={handleInputChange}
                                value={state.sourceOfIncome}
                                />
                        </div>
                        <div className="col">
                                <CDBInput material type="number" placeholder='Gross Annual Salary'
                                name="grossAnnualSalary"
                                value={state.grossAnnualSalary}
                                onChange={handleInputChange}
                                />
                        </div>
                        
                        </div>
                      
                      
                        <CDBBtn color="dark" className="btn-block my-3 mx-8" type='submit' id="submit" >
                                 Update
                        </CDBBtn>
                        </form>
                   
                        </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )
}

export default OccupationDetailUpdate;