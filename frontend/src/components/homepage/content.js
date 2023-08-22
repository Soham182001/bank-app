import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Transact from '../transactions/Transact';
import ShowBalance from '../showBalance/showBalance';
import ShowTransaction from '../showTransaction/showTransaction';
import CreateAccountPage from '../createaccount/createAccount';
import UserDetails from '../details/userDetails';

const Content = () => {
    return(
        <div>
            <Routes>
                <Route path='/' element={<div>Hello Welcome To Your Account</div>} />
                <Route path='/transact' element={<Transact/>}/>
                <Route path='/showBalance' element={<ShowBalance/>}/>
                <Route path='/showTransaction' element={<ShowTransaction/>} />
                <Route path='/createaccount' element={<CreateAccountPage/>} />
                <Route path='/userDetails' element={<UserDetails/>}/>
            </Routes>
        </div>
    )
}

export default Content;