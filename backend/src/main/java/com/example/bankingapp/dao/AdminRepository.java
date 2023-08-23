package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bankingapp.model.Admin;

import jakarta.transaction.Transactional;

@Repository
public interface AdminRepository extends JpaRepository <Admin,String>{
	
	@Transactional
	@Modifying
	@Query("update Admin admin set admin.password=?2 where admin.empId=?1")
	public int updatePasswordAdmin(String empId, String s);

}
