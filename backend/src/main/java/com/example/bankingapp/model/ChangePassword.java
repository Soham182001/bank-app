package com.example.bankingapp.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChangePassword {
	@Column(nullable = false)
	@NotBlank(message = "Customer password can't be blank")
	@Size(min = 7, max = 14, message = "Password must be between 7 - 14 characters")
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
