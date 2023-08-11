import React from 'react';
import {useLocation} from  'react-router-dom'
const HomePage = () =>{

    return(

        <div>
            <h1>
                Welcome to Wells Fargo!
            </h1>
            <div>
            <a href='./login'>Login</a>
            <br></br>
            <a href='./register'>SignUp</a>
            </div>
           
        </div>
    )
}

export default HomePage;