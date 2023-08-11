import React from 'react';
import {useLocation} from  'react-router-dom'
const WelcomePage = () =>{

    const state = useLocation();
    console.log(state.state.state.custId);
    let custId = undefined;
    custId = state.state.state.custId;
    return(

        <div>
            <h1>
                Welcome to Wells Fargo!
            </h1>
            {(custId === undefined)? 
            <div>
                    <h2>Some error occured</h2>
            </div>
            
            :
                <div>
                    <h2>{custId}! Have a good day</h2>
                </div>
            }
        </div>
    )
}

export default WelcomePage;