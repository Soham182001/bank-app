package com.example.bankingapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Transaction_info")
public class Transaction {
	
	@Id
	private String transactionId;
	private String status;
	private int amount;
	private String timeStamp;
	
	
	@ManyToOne
	@JoinColumn(name="senderAccount")
	private Account senderAccount;
	
	@ManyToOne
	@JoinColumn(name="recieverAccount")
	private Account recieverAccount;
	
	
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

}
