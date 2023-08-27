package com.example.bankingapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AccountRepository;
import com.example.bankingapp.dao.CustomerRepository;
import com.example.bankingapp.dao.TransactionRepository;
import com.example.bankingapp.exception.ResourceNotFoundException;
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
	
	@Autowired
	CustomerRepository custRepo;

	public String transaction(TransactionModel transModel) throws ResourceNotFoundException{
		
		AccountUpdateModel accountModel = transModel.getAccountUpdateModel();
		Transaction trans = transModel.getTransaction();
		String senderNum=accountModel.getSenderAccount();
		String recieverNum=accountModel.getRecieverAccount();
		
		Optional<Account> acc=accRepo.findById(senderNum);
		if(!acc.isPresent()) throw new ResourceNotFoundException( "Sender account invalid.");
		Account senderAccount = acc.get();
		
		Optional<Account> acc1=accRepo.findById(recieverNum);
		if(!acc1.isPresent()) throw new ResourceNotFoundException( "Reciever account invalid.");

		Account recieverAccount = acc1.get();
		if(recieverAccount.getDateClosed()!=null) {
			throw new ResourceNotFoundException( "Receiver account suspended.");
		}
		
		trans.setSenderAccount(senderAccount);
		trans.setRecieverAccount(recieverAccount);
		trans.setAmount(accountModel.getAmount());
		
		String res="";

		if(senderNum.equals(recieverNum)) {
			if(trans.getType().equals("withdrawal")) {
				int balance=senderAccount.getBalance();
				if((balance-accountModel.getAmount())<1000) {
					res="Insufficient Balance";
					trans.setStatus("Failed");
					throw new ResourceNotFoundException( "Insufficient Balance");
				}
				else {
					int rows=accRepo.updateBalance(accountModel.getAmount(),senderNum);
					if(rows>0) {
						res="Withdrawal Successful";
						trans.setStatus("Success");
					}
					else {
						res="Error";
						trans.setStatus("Failed");
						throw new ResourceNotFoundException( "ERROR");
					}
				}
			}
			else {
				int balance=senderAccount.getBalance();
				int rows=accRepo.updateBalance1(accountModel.getAmount(),senderNum);
				if(rows>0) {
					res="Deposit Successful";
					trans.setStatus("Success");
				}
				else {
					res="Error";
					trans.setStatus("Failed");
					throw new ResourceNotFoundException( "ERROR");
				}
			}
			
		}
		else {
			int b1=senderAccount.getBalance();
			int b2=recieverAccount.getBalance();
			if((b1-accountModel.getAmount())<1000) {
				res="Insufficient Balance";
				trans.setStatus("Failed");
				throw new ResourceNotFoundException( "Insufficient Balance");
			}
			else {
				int rows1=accRepo.updateBalance(accountModel.getAmount(),senderNum);
				int rows2=accRepo.updateBalance1(accountModel.getAmount(),recieverNum);
				if(rows1>0 && rows2>0) {
					res="Fund transferred successfully.";
					trans.setStatus("Success");
				}
				else {
					res="Transfer failed.";
					trans.setStatus("Failed");
					throw new ResourceNotFoundException( "Insufficient Balance");
				}
			}
		}
		
		
		transRepo.save(trans);
		return res;
	}
	
	public List<Transaction>fetchTransactions(String custId) throws ResourceNotFoundException{
//		Optional<Customer> ad=custRepo.findById(custId);
//		if(!ad.isPresent()) throw new ResourceNotFoundException("Customer not found.");
		List<String> accList=accRepo.findByUsername(custId);
		if(accList.size()==0) throw new ResourceNotFoundException("Customer not found.");
		
		List<Transaction> txnList  = new ArrayList<Transaction>();
				
		for(int i=0; i<accList.size(); i++) {
			String str = accList.get(i);
			List<Transaction> subTranx = transRepo.findByAccountNo(str);
			for(int j=0; j<subTranx.size(); j++) {
				Transaction x = subTranx.get(j);
				txnList.add(x);
			}
		}
			
		return txnList;
	}
public List<Transaction>fetchTransactionsByAccNo(String accNo) throws ResourceNotFoundException{
		
		
		List<Transaction> txnList  = new ArrayList<Transaction>();

		List<Transaction> subTranx = transRepo.findByAccountNo(accNo);
		if(subTranx.size()==0) throw new ResourceNotFoundException("Account number not found.");
		for(int j=0; j<subTranx.size(); j++) {
		Transaction x = subTranx.get(j);
		txnList.add(x);
			
		}
			
		return txnList;
//		return subTranx;
	}
}
