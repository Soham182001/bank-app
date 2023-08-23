package com.example.bankingapp.model;

public class TransactionModel {

	private AccountUpdateModel accountUpdateModel;
	private Transaction transaction;
	public AccountUpdateModel getAccountUpdateModel() {
		return accountUpdateModel;
	}
	public void setAccountUpdateModel(AccountUpdateModel accountUpdateModel) {
		this.accountUpdateModel = accountUpdateModel;
	}
	public Transaction getTransaction() {
		return transaction;
	}
	public void setTransaction(Transaction transaction) {
		this.transaction = transaction;
	}
}
