import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>      
      <CDBSidebar style={{height: "91.5vh"}} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Dashboard</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
          <NavLink exact to='/welcome/accountDetails' activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user">Account Details                                                   </CDBSidebarMenuItem>
           </NavLink>
            
          <NavLink exact to='/welcome/transact' activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="exchange-alt">Fund Transfer</CDBSidebarMenuItem>
            </NavLink>
          <NavLink exact to='/welcome/showTransaction' activeClassName="activeClicked">
            
            <CDBSidebarMenuItem icon="hourglass" iconType="solid">Transactions</CDBSidebarMenuItem>
            </NavLink>
          <NavLink exact to='/welcome/withdraw' activeClassName="activeClicked">

            <CDBSidebarMenuItem icon="credit-card" iconType="solid">Withdrawal/Deposit</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to='/welcome/showBalance' activeClassName="activeClicked">
           
            <CDBSidebarMenuItem icon="money-bill" iconType="solid"><a href=''>Check Balance</a></CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to='/welcome/createaccount' activeClassName="activeClicked">
           
            <CDBSidebarMenuItem icon="plus" iconType="solid">New Account</CDBSidebarMenuItem>            
          </NavLink>

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