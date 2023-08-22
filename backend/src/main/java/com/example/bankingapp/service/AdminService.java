package com.example.bankingapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AdminRepository;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.AdminLoginModel;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;

@Service
public class AdminService {
	
	@Autowired
	AdminRepository adminRepo;

	public String saveAdmin(Admin admin) {
		System.out.println("line 19");
		Optional<Admin> obj = adminRepo.findById(admin.getEmpId());
		System.out.println("line 21");
		String result = "";
		if (obj.isPresent()) {
			result = "exists";
			System.out.println("line 25");
		} else {
			System.out.println("line 27");
			result = "inserted success";
			adminRepo.save(admin);

		}

		return result;
	}

	public String validateAdmin(AdminLoginModel u) {
		String result = "";
		Admin admin = null;
		Optional<Admin> obj = adminRepo.findById(u.getEmpId());

		if (obj.isPresent()) {
			admin = obj.get();
		}
		if (admin == null) {
			result = "Invalid Admin";
		}

		else {
			if (u.getPassword().equals(admin.getPassword())) {
				result = "Login Success";
			} else {
				result = "Login Failed";
			}
		}
		return result;
	}

}
