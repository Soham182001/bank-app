package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AccountRepository;
import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.model.Account;
import com.example.bankingapp.model.Customer;

@Service
public class AccountService {

	@Autowired
	AccountRepository accRepo;
	
	@Autowired
	CustomerRepository userRepo;
	
	public Account createAccount(Account account,String username) {
		Customer u = userRepo.findById(username).get();
		account.setCustomer(u);
		return accRepo.save(account);
	}
	
	
}
