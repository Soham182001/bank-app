import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';

import Container from 'react-bootstrap/Container';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import '../../components/css/components.css'

const TransactAdmin = () =>{

    const [custId, setCustId] = useState("");
    const [balance, setBalance] = useState(-1);
    const [accountId, setAccountId] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [type,setType]  = useState('customer id');

    const handleFetch = () => {
        if(type === 'customer id') {
            fetchBalanceCustId();
        }
        else if(type === 'account id') {
                fetchBalanceAccId();
        }
    }
    const fetchBalanceAccId = () => {
        const URL = `http://localhost:8080/fetchTransactionsByAccNo/${accountId}`
        axios({
            method: 'get',
            url: URL
        })
        .then((response) => {
            // setBalance(response.data)
            setTransactions(response.data)
        })
    }
    const fetchBalanceCustId = () =>{
        const URL = `http://localhost:8080/fetchTransactions/${custId}`
        // console.log(custId.target.value);
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{
;                let temp= (response.data);
                console.log(temp);
                setTransactions(temp);
            }
        )
        .catch(e => {
            console.log(e);
        })
    }
    const queryTypes=[{label:"customer id",value:1},{label:"account id",value:2}];


    return (
        <div>
            <CDBContainer style={{marginLeft: "40%", marginTop: "10%"}}>
            <CDBCard style={{ width: "35rem", borderRadius: "1rem" }} border>
            <CDBCardBody>
           
            <h3  style={{padding: "6%"}}>Transactions</h3>
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

                // <input name='custId' placeholder='Enter Customer Id' onChange={e => setCustId(e)}></input>
               
                <div class="group">  
                    <input name='custId' required onChange={e => setCustId(e.target.value)}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Customer ID</label>     
                </div>
                :
                // <input name='accountId' placeholder='Enter Account Id' onChange={e => setAccountId(e)}></input>

                <div class="group">  
                    <input name='accountId' required onChange={e => setAccountId(e.target.value)}></input>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Account No.</label>     
                </div>
                }
                <div class="group">
            <button onClick={handleFetch}>Show Transactions</button>
            </div>
            </Container>
            </form>
            </div>

            { transactions.length > 0 ? 
            // <table>
            //     <tbody>
            //     <tr>
            //         <th>Account No.</th>
            //         <th>Balance</th>
            //     </tr>
            //     {account.map((bal,i)=>
            //     <tr key={i}>
            //         <td>{bal.accountNo}</td>
            //         <td>{bal.balance}</td>
            //     </tr>
            //     )}
            //     </tbody>
            // </table>
            <div className="d-flex justify-content-center">
            
            <CDBTable style={{width:"400px"}}>
                <caption>List of Transactions</caption>
                <CDBTableHeader color='primary-info'>

                <tr>
                    <th>Reciever Account No.</th>
                    <th>Sender Account No.</th>
                    <th>Amount</th>
                    <th>Time Stamp</th>
                    <th>Type</th>
                </tr>
                </CDBTableHeader>
                <CDBTableBody>
                {transactions.map((Trans,i)=>
                <tr key={i} style={{backgroundColor:Trans.type === 'deposit'?"green":Trans.type==='withdrawal'?'red':'greenyellow'}}>
                    <td  style={{width:"200 px"} }>{Trans.recieverAccount.accountNo}</td>
                    <td style={{width:"200 px"} }>{Trans.senderAccount.accountNo}</td>
                    <td style={{width:"200 px"} } >{Trans.amount}</td>
                    <td style={{width:"200 px"} } >{Trans.timeStamp}</td>
                    <td style={{width:"200 px"} }>{Trans.type}</td>
                </tr>
                )}
                </CDBTableBody>
                
            </CDBTable>
            </div>
          

            : 
            <div>No data found</div>
            }
            
             </CDBCardBody>
            </CDBCard>
          </CDBContainer>
       </div>
       
    )
}

export default TransactAdmin