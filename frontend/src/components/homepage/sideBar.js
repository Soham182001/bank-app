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
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large"><a href='/account'>Account Details</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note"><a href='/transact'>Fund Transfer</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid"><a href='/transactions'>Transactions</a></CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="th-large" iconType="solid"><a href='/transact'>Withdrawal/Deposit</a></CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
  );
};

export default Sidebar;