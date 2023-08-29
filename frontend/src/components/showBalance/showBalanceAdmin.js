import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import SweetAlert2 from 'react-sweetalert2';
import Container from 'react-bootstrap/Container';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBCard, CDBCardBody, CDBContainer } from 'cdbreact';
import '../../components/css/components.css'

const ShowBalanceAdmin = () =>{

    const [custId, setCustId] = useState("");
    const [balance, setBalance] = useState(-1);
    const [accountId, setAccountId] = useState("");
    const [account, setAccount] = useState([]);
    const [type,setType]  = useState('customer id');
    const [swalProps, setSwalProps] = useState({});


    const handleFetch = (e) => {
        e.preventDefault();
        if(type === 'customer id') {
            setBalance(-1);
            setAccount([]);
            fetchBalanceCustId();
        }
        else if(type === 'account id') {
            setBalance(-1);
            setAccount([]);
            fetchBalanceAccId();
        }
    }
    const fetchBalanceAccId = () => {
        const URL = `http://localhost:8080/checkBalanceByAccNo/${accountId}`
        axios({
            method: 'get',
            url: URL
        })
        .then((response) => {
            setBalance(response.data)
            setSwalProps({
                show: true,
                title: 'Balance',
                width: "800px"
            })
        })
        .catch(e => {
            alert(e.response.data.message)
            console.log(e);
        })
    }
    const fetchBalanceCustId = () =>{
        const URL = `http://localhost:8080/checkBalance/${custId}`
        // console.log(custId.target.value);
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
;                let temp= (response.data);
                setAccount(temp);
                setSwalProps({
                    show: true,
                    title: 'Balance',
                    width: "800px"
                })
            }
        )
        .catch(e => {
            alert(e.response.data.message)

            console.log(e);
        })
    }
    const queryTypes=[{label:"customer id",value:1},{label:"account id",value:2}];


    return (
        <div>
            <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
           
            <h3  style={{padding: "6%"}}>Check Balance</h3>
            <div className="d-flex justify-content-center">
            <form onSubmit={(e)=>e.preventDefault()}>
            <Container>
                <div class="group">  
              
            <Select
                name='select2'
                options={queryTypes}
                onChange={value=>setType(value.label)}
               />
               </div>
               {
                type === 'customer id' ? 
                <div class="group">  
                    <input name='custId' required onChange={e => setCustId(e.target.value)}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Customer ID</label>     
                </div>
                :
                <div class="group">  
                    <input name='accountId' required onChange={e => setAccountId(e.target.value)}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Account No.</label>     
                </div>
                }
                <div class="group">
                    <button className='button button5' onClick={handleFetch} >Check Balance</button>
                </div>
            </Container>
            </form>
            </div>
                { account.length > 0 ? 
                <SweetAlert2 {...swalProps}
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                <div className="d-flex justify-content-center">
                <CDBTable style={{width:"400px"}}>
                    <caption>List of Accounts</caption>
                    <CDBTableHeader color='primary-info'>
                    <tr>
                        <th >#</th>
                        <th >Account No.</th>
                        <th >Balance</th>
                    </tr>
                    </CDBTableHeader>
                    <CDBTableBody >
                    {account.map((bal,i)=>
                        <tr key={i}>
                            <td style={{width:"200 px"} }>{i}</td>
                            <td style={{width:"200 px"} }>{bal.accountNo}</td>
                            <td style={{width:"200 px"} }>{bal.balance}</td>
                        </tr>
                        )}
                    </CDBTableBody>
                </CDBTable>
                </div>
                
                </SweetAlert2>
                : 
                    <div></div>
                }
            

            {balance !== -1 ? 
            <SweetAlert2 {...swalProps}
            onConfirm={()=>{setSwalProps({show:false})}}
            >
            <div>Your Account Balance: {balance}</div>
            </SweetAlert2>
             : 
             <div></div>
             }
            
             </CDBCardBody>
            </CDBCard>
          </CDBContainer>
       </div>
       
    )
}

export default ShowBalanceAdmin