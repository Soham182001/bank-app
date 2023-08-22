package com.example.bankingapp.model;

import java.util.List;

public class AccountData {

    protected Account account;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    protected List<Address> address;

    public List<Address> getAddress() {
        return address;
    }

    public void setAddress(List<Address> address) {
        this.address = address;
    }

    protected Occupation occupation;

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public Occupation getOccupation() {
        return occupation;
    }

}

/*
 * Sample JSON object for account creation will look like
 * 
 * {
 * "account":{
 * "accountNo":"378439847398",
 * "balance":0,
 * "type":"savings",
 * "dateOpened":"2000-09-02"
 * },
 * "address":[
 * {
 * "addressLine1":"House number 811",
 * "addressLine2":"Sector 9",
 * "landmark":"Near ESI Hospital",
 * "state":"Haryana",
 * "city":"Faridabad",
 * "pincode":121006,
 * "addressType":"Permanent"
 * },
 * {
 * "addressLine1":"House number 811",
 * "addressLine2":"Sector 9",
 * "landmark":"Near ESI Hospital",
 * "state":"Haryana",
 * "city":"Faridabad",
 * "pincode":121006,
 * "addressType":"Temporary"
 * }
 * ],
 * "occupation":{
 * "occupationType":"Service",
 * "sourceOfIncome":"Job",
 * "grossAnnualSalary":20000
 * }
 * }
 * 
 */