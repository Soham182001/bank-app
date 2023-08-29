import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {  CDBContainer,
    CDBCard,
    CDBCardBody} from "cdbreact";
import '../../components/css/components.css';
import SweetAlert2 from 'react-sweetalert2';

const ActivateAccount = () => {

    const [accountNo, setAccountNo] = useState("");
    const [flag, setFlag] = useState(-1);
    const [swalProps, setSwalProps] = useState({});

    const activateAccount = (e) =>{
        e.preventDefault();
        const URL = `http://localhost:8080/activateAccount/${accountNo}`;
        axios({
            method: 'put',
            url: URL,
          })
        .then(
            (response)=>{
                let temp= (response.data);
                if(temp == "Account already activated."){
                    setFlag(1);
                }else{
                    setFlag(-1);
                }
                setSwalProps({
                    show: true,
                    title: 'Status',
                });
            }
        )
        .catch(e => {
            if(e.response){
                console.log(e.response)
                // console.log(e.message);
                if(e.response.data.message === "Account not found.")
                setFlag(0);
                else
                setFlag(1);
    
                setSwalProps({
                    show: true,
                    title: 'Status',
                });
                console.log(flag)
                }
            console.log(e);
        })
    }

    return (
        <div>
            <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
            <h3 style={{padding: "6%"}}>Activate Account</h3>
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
                    <button className='button button5' onClick={activateAccount} >Activate</button>
                </div>
                </Container>
                </form>
           </div>
            </CDBCardBody>
            </CDBCard>
          </CDBContainer>
          { flag == -1 ? 
            <div>
                <SweetAlert2 {...swalProps} icon='success'
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                    <h4>Account Activated!</h4>
                </SweetAlert2>
            </div>
            : flag === 0  ?
            
            <div>
                <SweetAlert2 {...swalProps} icon='warning'
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                    <h4>Account Number Invalid</h4>
                </SweetAlert2>
            </div>
            :
            <div>
                <SweetAlert2 {...swalProps} icon='warning'
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                    <h1>Account Was Already Activated!</h1>
                </SweetAlert2>
            </div>
          }
        </div>
    )
}

export default ActivateAccount;