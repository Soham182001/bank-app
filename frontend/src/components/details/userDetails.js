import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
  } from 'mdb-react-ui-kit';
import { CDBInput, CDBCard, CDBCardBody, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import UserDetail from '../../models/UserDetail';
import CustomerDetailUpdate from '../updateForms/customerDetailUpdate';
import AddressUpdateHome from '../updateForms/addressDetailHome';

const UserDetails = () =>{
    const [userData,setUserData]=useState(null);
    useEffect(()=>{
        const x = new UserDetail(JSON.parse(sessionStorage.getItem('info')), JSON.parse(sessionStorage.getItem('occupation')))
        x.addAddress(JSON.parse(sessionStorage.getItem('address')));
        x.addAccount(JSON.parse(sessionStorage.getItem('accounts')));
        setUserData(x);
    },[])

        const [iconsActive, setIconsActive] = useState('tab1');

        const handleIconsClick = (value) => {
          if (value === iconsActive) {
            return;
          }
      
          setIconsActive(value);
        };

    return(
         <div>
            {userData ?  ( 
                <div>
                    <CDBContainer style={{marginLeft: "3%", marginTop: "5%"}}>
                    <CDBCard style={{ width: "60rem", borderRadius: "1rem" }} border>
                    <CDBCardBody>
                    <h3 style={{padding: "3%"}}>User Details</h3>
                    <MDBTabs className='mb-3'>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                            <MDBIcon fas icon='chart-pie' className='me-2' /> Contact
                        </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                            <MDBIcon fas icon='chart-line' className='me-2' /> Address
                        </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
                            <MDBIcon fas icon='cogs' className='me-2' /> Occupation
                        </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>
                        <MDBTabsPane show={iconsActive === 'tab1'}>
                            {/* <table>
                                <tbody>
                                    <tr>
                                    {Object.keys(userData.customer).map((value,i)=>{
                                    
                                    return  <th key={i}> {value} </th>
                                })}
                                    </tr>
                                    <tr>
                                    {Object.values(userData.customer).map((value,i)=>{
                                    
                                    return  <td key={i}> {value} </td>
                                })}
                                    </tr>
                                </tbody>
                            </table> */
                            <CustomerDetailUpdate/>}
                        </MDBTabsPane>
                        <MDBTabsPane show={iconsActive === 'tab2'}>
                            <AddressUpdateHome/>
                        {/* <h3>Permanent Address</h3>
                            <table>
                                <tbody>
                                <tr>
                                    {Object.keys(userData.addresses[0]).map((key,i)=>{
                                        
                                    return  <th key={i}> {key} </th>
                                    })}
                                </tr>

                                <tr>
                                    {Object.values(userData.addresses[0]).map((value,i)=>{
                                        
                                    return  <td key={i}> {value} </td>
                                    })}
                                </tr>
                                
                                </tbody>
                            </table>

                            <h3>Temporary Address</h3>
                            <table>
                                <tbody>
                                <tr>
                                    {Object.keys(userData.addresses[1]).map((key,i)=>{
                                        
                                    return  <th key={i}> {key} </th>
                                    })}
                                </tr>

                                <tr>
                                    {Object.values(userData.addresses[1]).map((value,i)=>{
                                        
                                    return  <td key={i}> {value} </td>
                                    })}
                                </tr>
                                
                                </tbody>
                            </table>  */}
                        </MDBTabsPane>
                        <MDBTabsPane show={iconsActive === 'tab3'}>
                        <table>
                            <tbody>
                            <tr>
                                {Object.keys(userData.occupation).map((key,i)=>{
                                    
                                return  <th key={i}> {key} </th>
                                })}
                            </tr>

                            <tr>
                                {Object.values(userData.occupation).map((value,i)=>{
                                    
                                return  <td key={i}> {value} </td>
                                })}
                            </tr>
                            
                            </tbody>
                        </table> 
                        </MDBTabsPane>
                    </MDBTabsContent>
                    
                    </CDBCardBody>
                    </CDBCard>
                    </CDBContainer>
                </div>
            )
           :  
           <h3>No data yet</h3>} </div>
    )

}


export default UserDetails;