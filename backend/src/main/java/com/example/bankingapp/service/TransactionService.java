package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.TransactionRepository;
import com.example.bankingapp.model.Transaction;

@Service
public class TransactionService {
	@Autowired
	TransactionRepository transRepo;
	public String transaction(Transaction trans) {
		transRepo.save(trans);
		return "Transaction Completed";
	}
}
