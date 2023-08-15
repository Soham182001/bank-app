import React from 'react';
import sessionStorage from "sessionstorage";

const WelcomePage = () =>{    

    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);

    const handleLogout = () =>{
        
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
                <h2>Have a good day!</h2>
            </div>
            
        </div>
    )
}

export default WelcomePage;