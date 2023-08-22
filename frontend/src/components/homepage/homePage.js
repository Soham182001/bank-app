import React from 'react';
import './homePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () =>{
    const navigate = useNavigate();

    const redirectUser = () => {
        navigate('./login')
    }

    const redirectAdmin = () => {
        navigate('./loginAdmin')
    }

    return(
    <div class="wrapper">
        <div class="message">
            <div class="content">
                <h1>Welcome To Wells Fargo</h1>
                <div class="btns">
                <button onClick={redirectAdmin} class="outline purple-white">Admin Login</button>

                <button onClick={redirectUser} class="outline white-purple">User Login</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default HomePage;