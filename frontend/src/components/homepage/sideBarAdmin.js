import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const SidebarAdmin = () => {
  return (
    <div>      
      <CDBSidebar style={{height: "91.5vh"}} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Admin Dashboard</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="user"><a href='/welcomeAdmin/account'>Transactions</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="exchange-alt"><a href='/welcomeAdmin/transact'>Update Details</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="hourglass" iconType="solid"><a href='/welcomeAdmin/showTransaction'>Check Balance</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid"><a href='/welcomeAdmin/withdraw'>Suspend Account</a></CDBSidebarMenuItem>           
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Bank-App
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SidebarAdmin;