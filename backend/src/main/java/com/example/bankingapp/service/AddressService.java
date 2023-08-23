package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AddressRepository;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Customer;

@Service
public class AddressService {
	@Autowired
	AddressRepository addRepo;
	public String updateAddress(String custId, Address add) {
		int rows=addRepo.updateAddress(custId,add.getAddressLine1(),add.getAddressLine2(),add.getLandmark(),add.getState(),add.getCity(),add.getPincode(),add.getAddressType());
		if(rows>0) return "Successfully Updated";
		return "ERROR.";
	}

}
