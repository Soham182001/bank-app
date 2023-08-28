import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import SweetAlert2 from 'react-sweetalert2';
import Container from 'react-bootstrap/Container';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBCard, CDBCardBody, CDBContainer } from 'cdbreact';
import '../../components/css/components.css'


const TransactAdmin = () =>{

    const [custId, setCustId] = useState("");
    const [accountId, setAccountId] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [type,setType]  = useState('customer id');
    const [swalProps, setSwalProps] = useState({});

    const handleFetch = (e) => {
        e.preventDefault();
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
            setTransactions(response.data);
            setSwalProps({
                show: true,
                title: 'Transactions',
                width: "800px"
            }); 
        })
        .catch(e => {
            console.log(e);
        })
    }
    const fetchBalanceCustId = () =>{
        const URL = `http://localhost:8080/fetchTransactions/${custId}`
        axios({
            method: 'get',
            url: URL,
          })
        .then(
            (response)=>{   
                setTransactions(response.data);
                setSwalProps({
                    show: true,
                    title: 'Transactions',
                    width: "800px"
                }); 
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
                required
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
                <button className='button button5' onClick={handleFetch} >Show Transactions</button>
            </div>
            </Container>
            </form>
            </div>

            <div>
                
                <SweetAlert2 {...swalProps}
                onConfirm={()=>{setSwalProps({show:false})}}
                >
                { transactions.length > 0 ?          
                <CDBTable style={{width:"730px", outerHeight: "500px"}}>
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
            
            : 
            <div>No data found</div>}
            </SweetAlert2>
            </div>
          

            
            {/* {balance !== -1 ? <div>Balance is {balance}</div> : <div></div>} */}
            
             </CDBCardBody>
            </CDBCard>
          </CDBContainer>
       </div>
       
    )
}

export default TransactAdmin