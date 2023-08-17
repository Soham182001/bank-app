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
		trans.setAmount(accountModel.getBalance());
		
		String res="";

		if(senderNum.equals(recieverNum)) {
			if(trans.getType().equals("withdrawal")) {
				int balance=senderAccount.getBalance();
				if(balance-accountModel.getBalance()<0) {
					res="Insufficient Balance";
					trans.setStatus("Failed");
				}
				else {
					int rows=accRepo.updateBalance(accountModel.getBalance(),senderNum);
					if(rows>0) {
						res="Withdrawal Successful";
						trans.setStatus("Success");
					}
				}
			}
			else {
				int balance=senderAccount.getBalance();
				int rows=accRepo.updateBalance1(accountModel.getBalance(),senderNum);
				if(rows>0) {
					res="Deposit Successful";
					trans.setStatus("Success");
				}
				else {
					res="Error";
					trans.setStatus("Failed");
				}
			}
			
		}
		else {
			int b1=senderAccount.getBalance();
			int b2=recieverAccount.getBalance();
			if(b1-accountModel.getBalance()<0) {
				res="Insufficient Balance";
				trans.setStatus("Failed");
			}
			else {
				int rows1=accRepo.updateBalance(accountModel.getBalance(),senderNum);
				int rows2=accRepo.updateBalance1(accountModel.getBalance(),recieverNum);
				if(rows1>0 && rows2>0) {
					res="Fund transferred successfully.";
					trans.setStatus("Success");
				}
				else {
					res="Transfer failed.";
					trans.setStatus("Failed");
				}
			}
		}
		
		
		transRepo.save(trans);
		return res;
	}
}
