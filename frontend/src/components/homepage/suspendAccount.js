import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {  CDBContainer,
    CDBCard,
    CDBCardBody} from "cdbreact"
import '../../components/css/components.css'

const SuspendAccount = () => {

    const [accountNo, setAccountNo] = useState("");

    const suspendAccount = () =>{
        const URL = `http://localhost:8080/suspendAccount/${accountNo}`;
        console.log(URL)
        axios({
            method: 'put',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                console.log(temp);
                setAccountNo("");
            }
        )
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <div>
            
            <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
            <h3 style={{padding: "6%"}}>Suspend Account Using Account Number</h3>
            <div className="d-flex justify-content-center">
                <form>
                <Container>
                <div class="group">  
                    <input name='accountNo' required onChange={e => setAccountNo(e.target.value)}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Account No.</label>     
                </div>
                <div class="group"> 
                    <input type='submit' onClick={suspendAccount} value="Suspend" />      
                </div>
                </Container>
                </form>
           </div>
            </CDBCardBody>
            </CDBCard>
          </CDBContainer>
        </div>
    )
}

export default SuspendAccount;