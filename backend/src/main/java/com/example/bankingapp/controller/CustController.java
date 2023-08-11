package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.service.CustService;

@RestController
@CrossOrigin("*")
public class CustController {
	@Autowired
	CustService custService;
	@PostMapping("/saveCustomer")
	public Customer saveCustomer(@RequestBody Customer cust) {
		Customer c=custService.saveCustomer(cust);
		return c;
	}
	
	@PostMapping("/checkLogin")
	public String validateUser(@RequestBody LoginModel u) {
		return custService.validateUser(u); 
	}
}
