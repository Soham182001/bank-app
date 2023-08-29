package com.example.bankingapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bankingapp.dao.AdminRepository;
import com.example.bankingapp.exception.CustomException;
import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.AdminLoginModel;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;

@Service
public class AdminService {
	
	@Autowired
	AdminRepository adminRepo;

	public String saveAdmin(Admin admin) throws CustomException{
		Optional<Admin> obj = adminRepo.findById(admin.getEmpId());
		String result = "";
		if (obj.isPresent()) {
			result = "exists";
			throw new CustomException("Already Exists");
		} else {
			result = "inserted successfully";
			adminRepo.save(admin);

		}

		return result;
	}

	public String validateAdmin(AdminLoginModel u) throws ResourceNotFoundException{
		String result = "";
		Admin admin = null;
		Optional<Admin> obj = adminRepo.findById(u.getEmpId());

		if (obj.isPresent()) {
			admin = obj.get();
		}
		if (admin == null) {
			result = "Invalid Admin";
			 throw new ResourceNotFoundException("Admin not found");
		}

		else {
			if (u.getPassword().equals(admin.getPassword())) {
				result = "Login Success";
			} else {
				result = "Login Failed";
				 throw new ResourceNotFoundException("Login failed.");
			}
		}
		return result;
	}

	public String updatePasswordAdmin(String empId, ChangePassword pass) throws ResourceNotFoundException{
		Optional<Admin> ad=adminRepo.findById(empId);
		if(!ad.isPresent()) throw new ResourceNotFoundException("Admin not found.");
		String s=pass.getPassword();
		int rows=adminRepo.updatePasswordAdmin(empId,s);
		if(rows>0) {
			return "Password updated successfully.";
		}
		throw new ResourceNotFoundException("Error");
	}

}
