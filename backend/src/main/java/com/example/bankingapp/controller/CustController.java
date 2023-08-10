package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.Customer;

@RestController
public class CustController {
	@Autowired
	CustService custService;
	@PostMapping("/saveCustomer")
	public Customer saveCustomer(@RequestBody Customer cust) {
		Customer c=custService.saveCustomer(cust);
		return c;
	}
	
	

}
