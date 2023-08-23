package com.example.bankingapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.UserDetails;

import jakarta.transaction.Transactional;

@Repository
public interface CustomerRepository extends JpaRepository <Customer,String> {
	
	@Transactional
	@Modifying
	@Query("update Customer customer set customer.password=?2 where customer.custId=?1")
	public int updatePassword(String custId, String pass);
	
	@Query("select DISTINCT new com.example.bankingapp.model.UserDetails(c,a,ad,o) from Customer c join c.account a join c.address ad join c.occupation o where c.custId=?1")
	public List<UserDetails> fetchCustomer(String custId);
	
}
