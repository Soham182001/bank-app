import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBContainer } from 'cdbreact';

const ChangePassword = () => {

    const navigate = useNavigate();
    const [newPassword, setNewPassword] =  useState('') 
    const [userId, setUserId] =  useState('') 


    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setNewPassword(value);
    }
    const handleInputUserName=(e)=>{
        const{name,value} = e.target;
        setUserId(value);
    }

    const handleSubmit = (e) => {
        const baseURL=`http://localhost:8080/updatePassword/${userId}`
        e.preventDefault();
        axios({
            method: 'put',
            url: baseURL,
            data: {password:newPassword}
          })
        .then(
            response=>{
            console.log(response.data)
            if(response.data)
            {
                    navigate('/login');
            }
            else{
                alert("Some error occurred . Please try again later");            
            }
            }
        )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            
                <CDBContainer style={{marginTop: "5em", marginLeft: "25em"}}>
                <CDBCard style={{ width: '30rem' }}>
                    <CDBCardBody className="mx-4">
                    <div className="text-center mt-4 mb-2">
                        <p className="h4"> Change Password</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <CDBInput material hint="Enter user Id" type='text' placeholder="Enter user Id"
                                    name='userId'
                                    value={userId}
                                    onChange={handleInputUserName} />
                  
                  
                    <CDBInput material hint="Enter new password" type='password' placeholder="Enter new password"
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={handleInputChange} />
                    <CDBInput material hint="Retype new Password" type="password" placeholder="Retype Password" 
                                    name='password' />
                    <div>
                    <CDBBtn color="dark" className="btn-block my-3 mx-0 " type="submit">
                        Change Password
                    </CDBBtn>
                    </div>    
                    </form>
                    
                    </CDBCardBody>
                </CDBCard>
                </CDBContainer>
        </div>
    )

}

export default ChangePassword;