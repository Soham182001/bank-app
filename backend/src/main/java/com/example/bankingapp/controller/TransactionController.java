package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.Transaction;
import com.example.bankingapp.service.TransactionService;

@RestController
@CrossOrigin("*")
public class TransactionController {
	@Autowired
	TransactionService transSer;
	@PostMapping("/transaction")
	public String transaction(@RequestBody Transaction trans) {
		String t=transSer.transaction(trans);
		return t;
	}
	
}
