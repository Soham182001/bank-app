package com.example.bankingapp.model;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AdminLoginModel {
	@NotBlank(message = "Customer ID can't be blank")
	@Length(min = 7, max = 15, message = "Customer ID must be between 7 - 15 letters")
	private String empId;
	
	@NotBlank(message = "Customer password can't be blank")
	@Size(min = 7, max = 14, message = "Password must be between 7 - 14 characters")
	private String password;
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
