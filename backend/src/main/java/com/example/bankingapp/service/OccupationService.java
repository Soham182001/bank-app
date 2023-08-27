package com.example.bankingapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AddressRepository;
import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.dao.OccupationRepository;
import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.Occupation;

@Service
public class OccupationService {
	@Autowired
	OccupationRepository occuRepo;
	
	@Autowired
	CustomerRepository custRepo;
	
	public String updateOccupation(String custId, Occupation occu) throws ResourceNotFoundException{
		Optional<Customer> ad=custRepo.findById(custId);
		if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
		int rows=occuRepo.updateOccupation(custId,occu.getGrossAnnualSalary(),occu.getSourceOfIncome(),occu.getOccupationType());
		if(rows>0) return "Successfully Updated";
		throw new ResourceNotFoundException("Error");
	}
}
