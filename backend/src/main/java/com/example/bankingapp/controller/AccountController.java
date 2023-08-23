package com.example.bankingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.AccountData;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.service.AccountService;

@RestController
@CrossOrigin("*")
public class AccountController {

	@Autowired
	AccountService accService;

	@PostMapping("/createAccount/{uname}")
	public String createAccount(@RequestBody AccountData account, @PathVariable("uname") String username) {
		String res = "";
		res = accService.createAccount(account, username);

		return res;

	}
	
	
	
	@PutMapping("/updatePasswordByAccountNo/{accountNo}")
	public String updatePasswordByAccountNo(@PathVariable ("accountNo") String accountNo,@RequestBody ChangePassword pass) {
		return accService.updatePasswordByAccountNo(accountNo,pass);
	}
	
	@PutMapping("/suspendAccount/{accountNo}")
	public String suspendAccount(@PathVariable ("accountNo") String accNo) {
		return accService.suspendAccount(accNo);
	}
	
	@PutMapping("/activateAccount/{accountNo}")
	public String activateAccount(@PathVariable ("accountNo") String accNo) {
		return accService.activateAccount(accNo);
	}
}




