package com.example.bankingapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository <Transaction,String> {
	@Query("select distinct transaction from Transaction transaction where transaction.senderAccount.accountNo=?1 or transaction.recieverAccount.accountNo=?1")
	public List<Transaction> findByAccountNo(String accno);
	
}
