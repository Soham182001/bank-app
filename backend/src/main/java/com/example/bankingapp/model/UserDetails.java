package com.example.bankingapp.model;

public class UserDetails {
	
	private Customer customer;
	private Account account;
	private Address address;
	private Occupation occupation;
	
	UserDetails(Customer customer,Account account,Address address,Occupation occupation){
		
		
		this.account = account;
	
		this.customer = customer;
		this.address = address;
		this.occupation = occupation;
	
		
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Occupation getOccupation() {
		return occupation;
	}

	public void setOccupation(Occupation occupation) {
		this.occupation = occupation;
	}

}
