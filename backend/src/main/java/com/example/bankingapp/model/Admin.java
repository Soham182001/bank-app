package com.example.bankingapp.model;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="admin_info")
public class Admin {
	@Id
	@NotBlank(message = "Customer ID can't be blank")
	@Length(min = 7, max = 15, message = "Customer ID must be between 7 - 15 letters")
	private String empId;
	
	@NotBlank(message = "Customer password can't be blank")
	@Size(min = 7, max = 14, message = "Password must be between 7 - 14 characters")
	private String password;
	
	@NotBlank(message = "Customer email can't be blank")
	@Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
	private String email;
	
	@NotBlank(message = "Customer phone can't be blank")
	@Pattern(regexp = "[\\d]{10}")
	private String phone;
	
	@Column(nullable = false)
	@NotBlank(message = "Customer first name can't be blank")
	private String firstName;

	private String middleName;

	@Column(nullable = false)
	@NotBlank(message = "Customer last name can't be blank")
	private String lastName;
	
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
