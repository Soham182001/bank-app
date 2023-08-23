package com.example.bankingapp.dao;

import java.math.BigInteger;
import java.time.LocalDate;
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
	
	@Query("select new com.example.bankingapp.model.UserDetails(c,a,ad,o) from Customer c join c.account a join c.address ad join c.occupation o where c.custId=?1")
	public List<UserDetails> fetchCustomer(String custId);
	
	@Transactional
	@Modifying
	@Query("update Customer customer set customer.DOB=?2,customer.firstName=?3,customer.middleName=?4,customer.lastName=?5,customer.fatherName=?6,customer.phone=?7,customer.email=?8,customer.adhaarNumber=?9 where customer.custId=?1")
	public int updateCustomer(String custId,LocalDate dob,String fn,String mn,String ln,String fan,String ph,String em,BigInteger ad);
	
}
