package com.example.bankingapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;

@Service
public class CustService {
	@Autowired
	CustomerRepository custRepo;

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
}
