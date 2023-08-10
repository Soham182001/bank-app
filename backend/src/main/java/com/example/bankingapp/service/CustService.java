package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.model.Customer;

@Service
public class CustService {
	@Autowired
	CustomerRepository custRepo;
	public Customer saveCustomer(Customer cust)
	{
		Customer obj=custRepo.save(cust);
		return obj;
	}
}
