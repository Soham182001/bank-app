import React from 'react';
import CustomerDetailUpdate from '../updateForms/customerDetailUpdate';

const UpdateDetails = (props) =>{
    return(
        <div>
            {props.type === "Customer Details" ? <CustomerDetailUpdate/> : <h3>No data</h3>}
        </div>
    )
}

export default UpdateDetails;