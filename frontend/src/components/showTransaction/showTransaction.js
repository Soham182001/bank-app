import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer, CDBCard, CDBCardBody, CDBBtn, CDBBtnGrp, CDBBadge } from 'cdbreact';



const itemsPerPage = 7; // Number of items to display per page

const TransactionTable = ({ transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentTransactions = transactions.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <CDBContainer style={{ marginLeft: "20%", marginTop: "10%" }}>
                <CDBCard style={{ width: "45rem", height: "30rem", borderRadius: "1rem" }} border>
                    <CDBCardBody style={{padding: '10px'}}>
                        <h3>All Your Transactions</h3>
                        <CDBTable style={{ width: '100%' }}>
                            {/* <caption>List of Transactions</caption> */}
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
                                {currentTransactions.map((trans, index) => (
                                    <tr>
                                        <td>{trans.recieverAccount.accountNo}</td>
                                        <td>{trans.senderAccount.accountNo}</td>
                                        <td key={index}
                                        style={{
                                            color:
                                                trans.type === 'deposit'
                                                    ? 'green'
                                                    : trans.type === 'withdrawal'
                                                        ? 'red'
                                                        : 'grey',
                                        }}>{trans.amount}</td>
                                        <td>{trans.timeStamp}</td>
                                        <td>{trans.type}</td>
                                    </tr>
                                ))}
                            </CDBTableBody>
                        </CDBTable>

                        {/* Pagination controls */}
                        <CDBBtnGrp style={{margin: '15px'}}>
                            <CDBBtn
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </CDBBtn>
                            <CDBBadge color='primary' style={{color: "white"}}>
                                Page {currentPage} of {totalPages}
                            </CDBBadge>
                            <CDBBtn
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </CDBBtn>
                        </CDBBtnGrp>
                    </CDBCardBody>
                </CDBCard>
            </CDBContainer>
        </div>
    );
};


const ShowTransaction = () => {
    const [tranx, setTranx] = useState([]);
    useEffect(() => {
        let data = sessionStorage.getItem("info");
        data = JSON.parse(data);
        console.log("hello")
        const custId = data.custId;

        const URL = `http://localhost:8080/fetchTransactions/${custId}`
        axios({
            method: 'get',
            url: URL,
        })
            .then(
                (response) => {
                    let temp = (response.data);
                    console.log('temp', temp);
                    setTranx(temp)
                }
            )
            .catch(e => {
                console.log(e);
            })
    }, [])

    return (
        <div>
            <TransactionTable transactions={tranx} />
        </div>
    )

}


export default ShowTransaction;