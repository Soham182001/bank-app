package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.service.AddressService;

@RestController
@CrossOrigin("*")
public class AddressController {
	@Autowired
	AddressService addService;
	
	@PutMapping("/updateAddress/{custId}")
	  public String updateAddress(@PathVariable("custId") String custId, @RequestBody Address address) {
		  return addService.updateAddress(custId,address);
	  }

}
