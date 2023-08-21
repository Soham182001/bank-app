package com.example.bankingapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.AccountBalance;
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
	
	@PutMapping("/updatePassword/{custId}")
	public String updatePassword(@PathVariable ("custId") String custId,@RequestBody ChangePassword pass) {
		return accService.updatePassword(custId,pass);
	}
	
	@GetMapping("/checkBalance/{accountNo}")
	public Integer checkBalance(@PathVariable("accountNo") String accNo) {
		return accService.checkBalanceByAccNo(accNo);
	}
}
