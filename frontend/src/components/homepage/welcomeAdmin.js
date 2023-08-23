import React from 'react';
import NavbarBootstrapAdmin from './navbarAdmin';
import SidebarAdmin from './sideBarAdmin';
import AdminContent from './contentAdmin';

const AdminWelcomePage = () => {

    return(
        <div>
            <NavbarBootstrapAdmin />
            <div style={{display: "flex", flexDirection: "row"}}>
                <SidebarAdmin/>
                <AdminContent/>
            </div>
        </div>
    )
}

export default AdminWelcomePage;