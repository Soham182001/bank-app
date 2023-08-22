import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const Sidebar = () => {
  return (
    <div>      
      <CDBSidebar style={{height: "91.5vh"}} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Dashboard</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="user"><a href='/welcome/account'>Account Details</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="exchange-alt"><a href='/welcome/transact'>Fund Transfer</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="hourglass" iconType="solid"><a href='/welcome/showTransaction'>Transactions</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid"><a href='/welcome/withdraw'>Withdrawal/Deposit</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="money-bill" iconType="solid"><a href='/welcome/showBalance'>Check Balance</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="plus" iconType="solid"><a href='/welcome/createaccount'>New Account</a></CDBSidebarMenuItem>            
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

export default Sidebar;