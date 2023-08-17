package com.example.bankingapp.model;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Customer_info")
public class Customer {

	// Customer Fields
	@Id
	@NotBlank(message = "Customer ID can't be blank")
	@Length(min = 7, max = 15, message = "Customer ID must be between 7 - 15 letters")
	private String custId;

	@Column(nullable = false)
	@NotBlank(message = "Customer first name can't be blank")
	private String firstName;

	private String middleName;

	@Column(nullable = false)
	@NotBlank(message = "Customer last name can't be blank")
	private String lastName;

	@Column(nullable = false)
	@NotBlank(message = "Customer father's name can't be blank")
	private String fatherName;

	@Column(nullable = false)
	@NotBlank(message = "Customer phone can't be blank")
	@Pattern(regexp = "[\\d]{10}")
	private String phone;

	@Column(nullable = false)
	@NotBlank(message = "Customer email can't be blank")
	@Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
	private String email;

	@Column(nullable = false)
	private BigInteger adhaarNumber;

	@Column(nullable = false)
	@NotBlank(message = "Customer password can't be blank")
	@Size(min = 7, max = 14, message = "Password must be between 7 - 14 characters")
	private String password;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate DOB;

	@OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Account> account;

	@OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Address> address;

	@OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Occupation> occupation;

	// Getters and setters

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
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

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
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

	public BigInteger getAdhaarNumber() {
		return adhaarNumber;
	}

	public void setAdhaarNumber(BigInteger adhaarNumber) {
		this.adhaarNumber = adhaarNumber;
	}

	public LocalDate getDOB() {
		return DOB;
	}

	public void setDOB(LocalDate dOB) {
		DOB = dOB;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
