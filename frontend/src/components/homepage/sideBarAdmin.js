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
            <CDBSidebarMenuItem icon="exchange-alt">Transactions</CDBSidebarMenuItem>

            </NavLink>
            <NavLink exact to='/welcomeAdmin/update'>
            <CDBSidebarMenuItem icon="edit">Update Details</CDBSidebarMenuItem>

            </NavLink>
          
          <NavLink exact to='/welcomeAdmin/showBalanceAdmin'>
          <CDBSidebarMenuItem icon="money-bill" iconType="solid">Check Balance</CDBSidebarMenuItem>


          </NavLink>

          <NavLink exact to='/welcomeAdmin/suspendAccount'>
          <CDBSidebarMenuItem icon="ban" iconType="solid">Suspend Account</CDBSidebarMenuItem>           

          </NavLink>

          <NavLink exact to='/welcomeAdmin/activateAccount'>
          <CDBSidebarMenuItem icon="check-circle" iconType="solid">Activate Account</CDBSidebarMenuItem>           

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