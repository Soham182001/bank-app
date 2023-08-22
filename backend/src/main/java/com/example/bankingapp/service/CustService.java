package com.example.bankingapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AccountRepository;
import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.AccountBalance;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.model.UserDetails;

@Service
public class CustService {
	@Autowired
	CustomerRepository custRepo;
	
	@Autowired
	AccountRepository accRepo;

	public String saveCustomer(Customer cust) {
		Optional<Customer> obj = custRepo.findById(cust.getCustId());

		String result = "";
		if (obj.isPresent()) {
			result = "exists";
		} else {
			result = "inserted success";
			custRepo.save(cust);

		}

		return result;
	}

	public String validateUser(LoginModel u) {

		String result = "";
		Customer cust = null;
		Optional<Customer> obj = custRepo.findById(u.getCustId());

		if (obj.isPresent()) {
			cust = obj.get();
		}
		if (cust == null) {
			result = "Invalid User";
		}

		else {
			if (u.getPassword().equals(cust.getPassword())) {
				result = "Login Success";
			} else {
				result = "Login Failed";
			}
		}
		return result;
	}
	
	public List<String>fetchAccounts(String uname){
		return accRepo.findByUsername(uname);
	}
	
	public List<AccountBalance> checkBalance(String uname) throws ResourceNotFoundException {
		List<String> acc=accRepo.findByUsername(uname);
		if(acc.size()==0)
			throw new ResourceNotFoundException("No accounts found");
		List<AccountBalance> res=new ArrayList<AccountBalance>();
		for(int i=0;i<acc.size();i++) {
			String s=acc.get(i);
			AccountBalance accBal=new AccountBalance();
			accBal.setAccountNo(s);
			int z=accRepo.getBalance(s);
			accBal.setBalance(z);
			res.add(accBal);
		}
		return res;
	}
	
	public List<UserDetails> fetchCustomer(String uname)
	{
		return custRepo.fetchCustomer(uname);
	}
}






