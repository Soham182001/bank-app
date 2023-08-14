package com.example.bankingapp.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Account_info")
public class Account {
	
	@Id
	private String accountNo;
	private int balance;
	private String dateOpened;
	private String dateClosed;
	private String type;
	@ManyToOne
	@JoinColumn(name="custId")
	private Customer customer;
	
	@OneToMany(mappedBy="senderAccount",fetch=FetchType.EAGER)
	private List<Transaction> senders;
	
	@OneToMany(mappedBy="recieverAccount",fetch=FetchType.EAGER)
	private List<Transaction> recievers;
	
	
	
	
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	public String getDateOpened() {
		return dateOpened;
	}
	public void setDateOpened(String dateOpened) {
		this.dateOpened = dateOpened;
	}
	public String getDateClosed() {
		return dateClosed;
	}
	public void setDateClosed(String dateClosed) {
		this.dateClosed = dateClosed;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer=customer;
	}

}
