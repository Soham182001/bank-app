package com.example.bankingapp.model;

public class AccountUpdateModel {

	private String senderAccount;
	private String recieverAccount;
	private int balance;
	public String getSenderAccount() {
		return senderAccount;
	}
	public void setSendersAccount(String sendersAccount) {
		this.senderAccount = sendersAccount;
	}
	public String getRecieverAccount() {
		return recieverAccount;
	}
	public void setRecieverAccount(String recieverAccount) {
		this.recieverAccount = recieverAccount;
	}
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	
}
