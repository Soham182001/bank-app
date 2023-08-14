package com.example.bankingapp.model;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="Customer_info")
public class Customer {

	@Id
	@NotBlank(message="Customer ID can't be blank")
	@Length(min=7,max=15,message="Customer ID must be between 7 - 15 letters")
	private String custId;
	

	@NotBlank(message="Customer name can't be blank")
	private String name;
	

	@NotBlank(message="Customer address can't be blank")
	private String address;
	

	@NotBlank(message="Customer phone can't be blank")
	@Pattern(regexp="[\\d]{10}")
	private String phone;
	

	@NotBlank(message="Customer email can't be blank")
	@Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
//	@Pattern(regexp="/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/",message="Invalid Email Address")
	private String email;
	
	
	@NotBlank(message="Customer password can't be blank")
	@Size(min=7,max=14,message="Password must be between 7 - 14 characters")
	private String password;
	

	@NotBlank(message="Customer DOB can't be blank")
	private String DOB;
	
	@OneToMany(mappedBy="customer",fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	private List<Account> account;
	
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDOB() {
		return DOB;
	}
	public void setDOB(String dOB) {
		DOB = dOB;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
