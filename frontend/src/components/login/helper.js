import Occupation from "../../models/Occupation";
import UserDetail from "../../models/UserDetail"
import Customer from '../../models/Customer';
import Address from '../../models/Address';
import Account from '../../models/Account';
import axios from 'axios'
const  getUserDetails = async  (custId) =>{

    console.log("helper:",custId)
    const saveData =  (res) => {
        console.log(JSON.stringify(res.customer));
       sessionStorage.setItem("info", JSON.stringify(res.customer));
      sessionStorage.setItem("address", JSON.stringify(res.addresses))
        sessionStorage.setItem("occupation",JSON.stringify(res.occupation));
        sessionStorage.setItem("accounts",JSON.stringify(res.accounts));
    }
    
    const URL = `http://localhost:8080/fetchCustomer/${custId}`
    axios({
        method: 'get',
        url: URL,
      })
    .then(
        (response)=>{
            let temp= (response.data);
            
            let val = Object.values(temp[0]["occupation"])
            const occ = new Occupation(...val);
            
            val = Object.values(temp[0]["customer"])
            const cust = new Customer(...val);
            
            let addresses=[]
            val = Object.values(temp[0]["address"])

            let permanentAddress = new Address(...val);
            val = Object.values(temp[1]["address"])

            let temporaryAddress = new Address(...val);

            addresses.push(permanentAddress)
            addresses.push(temporaryAddress)

            let accountSet = new Set()
            temp.forEach(element => {
            val = Object.values(element["account"])
            
            let acc = new Account(...val);
            accountSet.add(JSON.stringify(acc));
            });

            let accounts = []
            for (const entry of accountSet.values())
            {
                accounts.push(JSON.parse(entry));
            }

            const u = new UserDetail(cust,occ);

            u.addAccount(accounts);
            u.addAddress(addresses)

            saveData(u);
            return u;
        }
    )
    .catch(e => {
        console.log(e);
    })
}

export default getUserDetails;