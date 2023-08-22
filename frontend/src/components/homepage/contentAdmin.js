import React from 'react';
import {Routes, Route} from 'react-router-dom'
import ShowBalanceAdmin from '../showBalance/showBalanceAdmin';

const AdminContent = () =>{
    const style = {
        position: 'absolute',
        left: '50%'
    }
    return(
        <div>
            <Routes>
                <Route path='/' element={<div style={style}>Hello Admin!</div>} />
                <Route path='/showBalanceAdmin' element={<ShowBalanceAdmin/>}/>
            </Routes>
        </div>
    )
}

export default AdminContent;