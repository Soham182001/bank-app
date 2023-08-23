package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AddressRepository;
import com.example.bankingapp.dao.OccupationRepository;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Occupation;

@Service
public class OccupationService {
	@Autowired
	OccupationRepository occuRepo;
	public String updateOccupation(String custId, Occupation occu) {
		int rows=occuRepo.updateOccupation(custId,occu.getGrossAnnualSalary(),occu.getSourceOfIncome(),occu.getOccupationType());
		if(rows>0) return "Successfully Updated";
		return "ERROR.";
	}
}
