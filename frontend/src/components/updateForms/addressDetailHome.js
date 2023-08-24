import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import AddressDetailUpdate from './addressDetailUpdate';


const AddressDetailHome = ()=>{

    const [type,setType]=useState(-1);

    const types=[{label:'Permanent',value:1},{label:'Temporary',value:2}]

    return <div>
        <Select
        onChange={value => setType(value.value-1)}
        options={types}
        />

        {type !== -1 ? <AddressDetailUpdate type={type}/>: <div>Select an address type</div>}

    </div>

}
export default AddressDetailHome;