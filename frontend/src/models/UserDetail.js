
class UserDetail{
    constructor(customer,occupation)
    {
        this.customer=customer;
        this.accounts=[];
        this.addresses=[];
        this.occupation=occupation

        this.addAccount = function(account){
            this.accounts = account
        }

        
        this.addAddress = function(address){
            this.addresses = address;
        }
    }
}

export default UserDetail;