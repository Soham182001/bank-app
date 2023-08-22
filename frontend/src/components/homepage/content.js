import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Transact from '../transactions/Transact';
import ShowBalance from '../showBalance/showBalance';
import ShowTransaction from '../showTransaction/showTransaction';
import CreateAccountPage from '../createaccount/createAccount';
import UserDetails from '../details/userDetails';
import AddOccupation from './../createaccount/addOccupation';
import Address from './../createaccount/addAddress';
import Withdraw from '../withdraw/withdraw';

const Content = () => {
    const style = {
        position: 'absolute',
        left: '50%'
    }
    return(
        <div>
            <Routes>
                <Route path='/' element={<div style={style}>Hello Welcome To Your Account</div>} />
                <Route path='/transact' element={<Transact/>}/>
                <Route path='/withdraw' element={<Withdraw/>}/>
                <Route path='/showBalance' element={<ShowBalance/>}/>
                <Route path='/showTransaction' element={<ShowTransaction/>} />
                <Route path='/createaccount' element={<CreateAccountPage/>} />
                <Route path='/userDetails' element={<UserDetails/>}/>
                <Route path='/createaccount' element={<CreateAccountPage/>} />                
                <Route path='/addOccupation' element={<AddOccupation/>} />
                <Route path='/addPermanentAddress' element={<Address type="Permanent"/>}/>
                <Route path='/addTemporaryAddress' element={<Address type="Temporary"/>}/>
            </Routes>
        </div>
    )
}

export default Content;