package com.example.bankingapp.dao;

import java.math.BigInteger;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Address;

import jakarta.transaction.Transactional;
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
	@Transactional
	@Modifying
	@Query("update Address address set address.addressLine1=?2,address.addressLine2=?3,address.landmark=?4,address.state=?5,address.city=?6,address.pincode=?7 where address.customer.custId=?1 and address.addressType=?8")
	public Integer updateAddress(String custId,String ln1,String ln2,String lm,String st,String city,Integer pc,String addtype);
	
}