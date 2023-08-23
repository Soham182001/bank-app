import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBContainer,
  CDBCard,
  CDBCardBody
} from 'cdbreact';
import {NavLink, Navlink} from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div>      
      <CDBSidebar style={{height: "91.5vh"}} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Admin Dashboard</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink  exact to='/welcomeAdmin/transact'>
            <CDBSidebarMenuItem icon="user">Transactions</CDBSidebarMenuItem>

            </NavLink>
            <NavLink exact to='/welcomeAdmin/update'>
            <CDBSidebarMenuItem icon="exchange-alt">Update Details</CDBSidebarMenuItem>

            </NavLink>
          
          <NavLink exact to='/welcomeAdmin/showBalanceAdmin'>
          <CDBSidebarMenuItem icon="money-bill" iconType="solid">Check Balance</CDBSidebarMenuItem>


          </NavLink>

          <NavLink exact to='/welcomeAdmin/suspendAccount'>
          <CDBSidebarMenuItem icon="dumpster" iconType="solid">Suspend Account</CDBSidebarMenuItem>           

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

export default SidebarAdmin;