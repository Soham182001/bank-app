package com.example.bankingapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AccountRepository;
import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.exception.CustomException;
import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.AccountBalance;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.model.UserDetails;

@Service
public class CustService {
	@Autowired
	CustomerRepository custRepo;
	
	@Autowired
	AccountRepository accRepo;

	public String saveCustomer(Customer cust) throws CustomException{
		Optional<Customer> obj = custRepo.findById(cust.getCustId());

		String result = "";
		if (obj.isPresent()) {
			result = "exists";
			throw new CustomException("Customer already exists");
			
		} else {
			result = "inserted success";
			custRepo.save(cust);

		}

		return result;
	}

	public String validateUser(LoginModel u) throws ResourceNotFoundException {

		String result = "";
		Customer cust = null;
		Optional<Customer> obj = custRepo.findById(u.getCustId());
//		if(!obj.isPresent()) throw new ResourceNotFoundException("Invalid User");

		if (obj.isPresent()) {
			cust = obj.get();
		}
		if (cust == null) {
			result = "Invalid User";
			throw new ResourceNotFoundException("Invalid User");
		}

		else {
			if (u.getPassword().equals(cust.getPassword())) {
				result = "Login Success";
			} else {
				result = "Login Failed";
				throw new ResourceNotFoundException("Login Failed");
			}
		}
		return result;
	}
	
	public List<String>fetchAccounts(String uname) throws ResourceNotFoundException{
		List<String> res=accRepo.findByUsername(uname);
		if(res.size()==0) throw new ResourceNotFoundException("Customer not found");
		return res;
//		Optional<Customer> ad=custRepo.findById(uname);
//		if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
//		return accRepo.findByUsername(uname);
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
	
public String updatePassword(String custId, ChangePassword pass) throws ResourceNotFoundException{
	Optional<Customer> ad=custRepo.findById(custId);
	if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
		String s=pass.getPassword();
		int rows=custRepo.updatePassword(custId,s);
		if(rows>0) {
			return "Password updated successfully.";
		}
		throw new ResourceNotFoundException( "ERROR.");
}
  public List<UserDetails> fetchCustomer(String uname) throws ResourceNotFoundException
	{
	  Optional<Customer> ad=custRepo.findById(uname);
		if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
		return custRepo.fetchCustomer(uname);

	}

public String updateCustomer(String custId, Customer cust) throws ResourceNotFoundException{
	Optional<Customer> ad=custRepo.findById(custId);
	if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
	int rows=custRepo.updateCustomer(custId,cust.getDOB(),cust.getFirstName(),cust.getMiddleName(),cust.getLastName(),cust.getFatherName(),cust.getPhone(),cust.getEmail(),cust.getAdhaarNumber());
	if(rows>0) return "Successfully Updated";
	throw new ResourceNotFoundException("ERROR");
}
}






