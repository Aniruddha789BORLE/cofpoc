import React from 'react';
import { Link } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const SideBar = () => {
  return (
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">
              <Link to="/technical-specifications">Technical Specifications</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">
            <Link to="/data-manipulation">Data Manipulation</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">
            <Link to="/test">Test</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">
            <Link to="/testcasegeneration2">TestCaseGeneration</Link>
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>

            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              Metrics
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  );
};

export default SideBar;