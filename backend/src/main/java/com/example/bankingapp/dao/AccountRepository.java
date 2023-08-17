package com.example.bankingapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Account;

import jakarta.transaction.Transactional;

@Repository
public interface AccountRepository extends  JpaRepository <Account,String> {
	@Query("select account.accountNo from Account account where account.customer.custId=?1")
	public List<String> findByUsername(String username);
	
	@Transactional
	@Modifying
	@Query("update Account account set account.balance=account.balance-?1 where account.accountNo=?2")
	public int updateBalance(int bal,String acc);
}
