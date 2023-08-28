import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';
import {useNavigate} from "react-router-dom"
import Address from '../../models/Address';
const AddressDetailUpdate = (props) => {

        const customer  = JSON.parse(sessionStorage.getItem("info"));
        const address=JSON.parse(sessionStorage.getItem("address"))[props.type]
        const navigate = useNavigate();

        const [state, setState] = useState(
                new Address(...Object.values(address))
        ) 

        useEffect(()=>{
                
        },[])

        const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState((prevProps) => ({
                ...prevProps, 
                [name]: value
        }));
        }
    const baseURL=`http://localhost:8080/updateAddress/${customer.custId}`

    console.log(baseURL);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'put',
            url: baseURL,
            data: state
          })
        .then(
            response=>{
                alert("Address updated success")
                navigate('/welcome')
            }
        )
        .catch(e => {
            alert(e.message);
        })
    }

    return (
        <div>
                <CDBContainer style={{marginTop: "5em", marginLeft: "15em"}}>
                <CDBCard style={{ width: '30rem' }}>
                        <CDBCardBody className="mx-4">
                        
                        <form onSubmit={handleSubmit}>
                        <div className="text-center mt-4 mb-2">
                        <p className="h4"> Address Details </p>
                        </div>
                        <div className="form-flex-row mb-n4">
                        <div className="col">
                                <CDBInput material  type='text'  placeholder='Address Line 1' 
                                name='addressLine1'
                                onChange={handleInputChange}
                                value={state.addressLine1}
                                required/>
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='Address Line 2'
                                name="addressLine2"
                                onChange={handleInputChange}
                                value={state.addressLine2}
                                />
                        </div>
                        <div className="col">
                                <CDBInput material type="text" placeholder='Landmark'
                                name="landmark"
                                value={state.landmark}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='State'
                                name="state"
                                value={state.state}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="col">
                                <CDBInput material  type="text" placeholder='city'
                                name="city"
                                value={state.city}
                                onChange={handleInputChange}
                                required/>
                        </div>
                        
                        <div className="col">
                                <CDBInput material  type="number" placeholder='pincode'
                                name="pincode"
                                value={state.pincode}
                                onChange={handleInputChange}
                                required/>
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

export default AddressDetailUpdate;