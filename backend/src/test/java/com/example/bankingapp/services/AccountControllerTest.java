package com.example.bankingapp.services;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.bankingapp.controller.AccountController;
import com.example.bankingapp.controller.AdminController;
import com.example.bankingapp.controller.CustController;
import com.example.bankingapp.controller.TransactionController;
import com.example.bankingapp.model.Account;
import com.example.bankingapp.model.AccountBalance;
import com.example.bankingapp.model.AccountData;
import com.example.bankingapp.model.AccountUpdateModel;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.AdminLoginModel;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.model.Occupation;
import com.example.bankingapp.model.Transaction;
import com.example.bankingapp.model.TransactionModel;
import com.example.bankingapp.service.AccountService;
import com.example.bankingapp.service.AdminService;
import com.example.bankingapp.service.CustService;
import com.example.bankingapp.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)

public class AccountControllerTest {
	@Autowired
	private MockMvc mvc ;

	@InjectMocks
	private AccountController accController;
	@Mock
	private AccountService accSer;
	
	@BeforeEach
	public void setup() {
		mvc=MockMvcBuilders.standaloneSetup(accController).build();
		
	}
	@Test
	public void testUpdatePasswordByAccountNo() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		ChangePassword p=new ChangePassword();
		p.setPassword("user0002");
		Mockito.when(this.accSer.updatePasswordByAccountNo(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("Password updated successfully");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(p);
		MvcResult res=mvc.perform(put("/updatePasswordByAccountNo/{accountNo}","156489871104")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
//		.andExpect(jsonPath("$",Matchers.hasSize(1)))
//		//.andExpect(jsonPath("$[0].custId",Matchers.equalTo(cust.getCustId())));
//		.andExpect(jsonPath("$[0]",Matchers.equalTo(3000)));	
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Password updated successfully");
		System.out.println(result);

	}
	
	@Test
	public void testCreateAccount() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		
		Customer cust=new Customer();
		cust.setCustId("user0002");
		Occupation occu=new Occupation();
		Address ad=new Address();
		List<Address> addr=new ArrayList<Address>();
		addr.add(ad);
		AccountData acd=new AccountData();
		acd.setAccount(acc);
		acd.setAddress(addr);
		acd.setOccupation(occu);
		Mockito.when(this.accSer.updatePasswordByAccountNo(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("Account created");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(acd);
		MvcResult res=mvc.perform(post("/createAccount/{uname}","user0002")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();

		String result = res.getResponse().getContentAsString();
		assertEquals(result,"");
		System.out.println(result);

	}
	@Test
	public void testSuspendAccount() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		
		Mockito.when(this.accSer.suspendAccount(ArgumentMatchers.any())).thenReturn("Account suspended");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(acc.getAccountNo());
		MvcResult res=mvc.perform(put("/suspendAccount/{accountNo}","156489871104")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Account suspended");
		System.out.println(result);

	}
	@Test
	public void testCheckBalanceByAccountNo() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		acc.setBalance(2000);


		Mockito.when(this.accSer.checkBalanceByAccNo(ArgumentMatchers.any())).thenReturn(acc.getBalance());
		mvc.perform(get("/checkBalanceByAccNo/{AccountNo}","156489871104").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$",Matchers.equalTo(2000)));	

	}
	@Test
	public void testGetCustomerName() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		String nameOfCust="aa bb";


		Mockito.when(this.accSer.getCustomerName(ArgumentMatchers.any())).thenReturn(nameOfCust);
		mvc.perform(get("/getCustomerName/{AccountNo}","156489871104").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$",Matchers.equalTo("aa bb")));	

	}
	@Test
	public void testActivateAccount() throws Exception{
		Account acc=new Account();
		acc.setAccountNo("156489871104");
		
		Mockito.when(this.accSer.activateAccount(ArgumentMatchers.any())).thenReturn("Account activated");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(acc.getAccountNo());
		MvcResult res=mvc.perform(put("/activateAccount/{accountNo}","156489871104")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Account activated");
		System.out.println(result);

	}


}
