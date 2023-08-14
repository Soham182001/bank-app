package com.example.bankingapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bankingapp.model.Account;
import com.example.bankingapp.service.AccountService;

@RestController
@CrossOrigin("*")
public class AccountController {

	@Autowired
	AccountService accService;
	@PostMapping("/createAccount/{uname}")
	public String createAccount(@RequestBody Account account,@PathVariable("uname") String username) {
		String res = "";
		Account acc = accService.createAccount(account,username);
		
		if(acc!=null)
			res = "Account created";
		return res;
		
	}
}
