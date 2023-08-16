import React from 'react';
import sessionStorage from "sessionstorage";
import {useNavigate} from "react-router-dom";

const WelcomePage = () =>{    

    const navigate = useNavigate();
    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);

    const handleLogout = () =>{
        
    }

    const createAccount = () =>{
        navigate('/createaccount')
    }

    return(
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
            <h1>
                Welcome to Wells Fargo {data.custId}!
            </h1>
            
            
            <div>
                <button onClick={createAccount}>Create Account</button>
            </div>
            
        </div>
    )
}

export default WelcomePage;