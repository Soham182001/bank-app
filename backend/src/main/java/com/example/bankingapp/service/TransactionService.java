package com.example.bankingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AccountRepository;
import com.example.bankingapp.dao.TransactionRepository;
import com.example.bankingapp.model.Account;
import com.example.bankingapp.model.AccountUpdateModel;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.Transaction;
import com.example.bankingapp.model.TransactionModel;

@Service
public class TransactionService {
	@Autowired
	TransactionRepository transRepo;
	
	@Autowired
	AccountRepository accRepo;

	public String transaction(TransactionModel transModel) {
		
		AccountUpdateModel accountModel = transModel.getAccountUpdateModel();
		Transaction trans = transModel.getTransaction();
		String senderNum=accountModel.getSenderAccount();
		String recieverNum=accountModel.getRecieverAccount();
		

		Account senderAccount = accRepo.findById(senderNum).get();

		Account recieverAccount = accRepo.findById(recieverNum).get();
		
		trans.setSenderAccount(senderAccount);
		trans.setRecieverAccount(recieverAccount);
		
		String res="";

		if(senderNum.equals(recieverNum)) {
			int balance=senderAccount.getBalance();
			if(balance-accountModel.getBalance()<-100) {
				res="Insufficient Balance";
			}
			else {
				int rows=accRepo.updateBalance(accountModel.getBalance(),senderNum);
				if(rows>0) {
					res="Transaction Successful";
				}
			}
		}
		
		
		
		transRepo.save(trans);
		return res;
	}
}
