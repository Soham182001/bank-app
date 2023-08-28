package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.exception.ResourceNotFoundException;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.AdminLoginModel;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.service.AdminService;
import com.example.bankingapp.service.CustService;

@RestController
@CrossOrigin("*")
public class AdminController {
	@Autowired
	AdminService adminService;
	
	@PostMapping("/saveAdmin")
	public String saveAdmin(@RequestBody Admin admin) throws ResourceNotFoundException{
		String c=adminService.saveAdmin(admin);
		return c;
	}
	
	@PostMapping("/checkLoginAdmin")
	public String validateUser(@RequestBody AdminLoginModel u) throws ResourceNotFoundException{
		return adminService.validateAdmin(u); 
	}
	
	@PutMapping("/updatePasswordAdmin/{empId}")
	public String updatePassword(@PathVariable ("empId") String empId,@RequestBody ChangePassword pass) throws ResourceNotFoundException{
		return adminService.updatePasswordAdmin(empId,pass);
  }

}
