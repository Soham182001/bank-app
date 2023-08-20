import React from 'react';
import sessionStorage from "sessionstorage";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import NavbarBootstrap from './navbar';
import Sidebar from './sideBar';

const WelcomePage = () =>{    

    const navigate = useNavigate();
    let data = sessionStorage.getItem("info");
    data = JSON.parse(data);

    const custId = data.custId;

    const handleLogout = () =>{
        
        
    }

    const createAccount = () =>{
        navigate('/createaccount');
    }

    const saveData = (res) => {
        sessionStorage.setItem("account", res);
        console.log(JSON.stringify(sessionStorage))
    }

    const fetchAndMove = ()=>{

        // const URL = `http://localhost:8080/fetchAccounts/${custId}`
        // axios({
        //     method: 'get',
        //     url: URL,
        //   })
        // .then(
        //     (response)=>{
        //         console.log(response.data);
        //         saveData(JSON.stringify(response.data));
        //     }
        // )
        // .then(()=>{
        //     navigate('/transact');
        // })
        // .catch(e => {
        //     alert(e.message);
        //     console.log(e);
        // })

        
        navigate('/transact')
    }

    return(
        <div>
            {/* <button onClick={handleLogout}>
                Logout
            </button>
            <h1>
                Welcome to Wells Fargo {data.custId}!
            </h1>
            
            <button onClick={fetchAndMove}>Transact Money</button>

            <button onClick={createAccount}>Create Account</button>
            
            <div>
                <h2>Have a good day!</h2>
            </div> */}
            <NavbarBootstrap></NavbarBootstrap>
            <Sidebar></Sidebar>
            
        </div>
    )
}

export default WelcomePage;