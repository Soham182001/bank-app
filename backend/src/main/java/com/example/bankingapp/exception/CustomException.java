package com.example.bankingapp.exception;

public class CustomException extends Exception {
private static final long serialVersionUID = 1L;
	
	public CustomException(String message) {
		super(message);
	}
}
