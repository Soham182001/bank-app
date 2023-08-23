package com.example.bankingapp.dao;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Occupation;

import jakarta.transaction.Transactional;
@Repository
public interface OccupationRepository extends JpaRepository<Occupation, Integer> {
	@Transactional
	@Modifying
	@Query("update Occupation occupation set occupation.grossAnnualSalary=?2,occupation.sourceOfIncome=?3,occupation.occupationType=?4 where occupation.customer.custId=?1")
	public Integer updateOccupation(String custId,BigInteger sal,String srcinc,String occuType);
}
