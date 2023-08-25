import React from 'react';
import { Link , NavLink} from 'react-router-dom';
import PageNotFound from '../assets/404.png';

const  NotFoundPage =  (props)=>{

   const  redirectTo = props.home ;
//    consol
        return (<div>
            <img height={"100%"} width={"100%"} src={PageNotFound}  />
            <p style={{textAlign:"center"}}>
              <NavLink to={redirectTo}>
                <h3>Go to Home </h3>
                </NavLink>
            </p>
          </div>);
    
}
export default NotFoundPage