package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Occupation;
import com.example.bankingapp.service.AddressService;
import com.example.bankingapp.service.OccupationService;

@RestController
@CrossOrigin("*")
public class OccupationController {
	@Autowired
	OccupationService occuService;
	
	@PutMapping("/updateOccupation/{custId}")
	  public String updateOccupation(@PathVariable("custId") String custId, @RequestBody Occupation occu) throws ResourceNotFoundException{
		  return occuService.updateOccupation(custId,occu);
	  }

}
