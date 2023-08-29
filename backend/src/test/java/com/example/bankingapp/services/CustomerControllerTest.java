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

import com.example.bankingapp.controller.CustController;
import com.example.bankingapp.controller.TransactionController;
import com.example.bankingapp.model.Account;
import com.example.bankingapp.model.AccountBalance;
import com.example.bankingapp.model.AccountUpdateModel;
import com.example.bankingapp.model.Address;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
import com.example.bankingapp.model.Occupation;
import com.example.bankingapp.model.Transaction;
import com.example.bankingapp.model.TransactionModel;
import com.example.bankingapp.model.UserDetails;
import com.example.bankingapp.service.AccountService;
import com.example.bankingapp.service.CustService;
import com.example.bankingapp.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)

public class CustomerControllerTest {
	@Autowired
	private MockMvc mvc ;

	@InjectMocks
	private CustController custController;
	@Mock
	private CustService custSer;
	
	@BeforeEach
	public void setup() {
		mvc=MockMvcBuilders.standaloneSetup(custController).build();
	}

	@Test
	public void testSaveCustomer() throws Exception{
		Customer obj=new Customer();
		obj.setCustId("newuser");
		obj.setFirstName("lala");
		obj.setLastName("qaqa");
		BigInteger a=new BigInteger("123456789123");
		obj.setAdhaarNumber(a);
		obj.setMiddleName(null);
		obj.setEmail("lala@gmail.com");
		obj.setFatherName("qaqa");
		obj.setPassword("lalaqaqa");
		obj.setPhone("9999999999");
		Mockito.when(this.custSer.saveCustomer(ArgumentMatchers.any())).thenReturn("inserted successfully");
		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(obj);
	
		MvcResult res =  mvc.perform(post("/saveCustomer")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"inserted successfully");
		System.out.println(result);
	}
	@Test
	public void testCheckLogin() throws Exception{
		LoginModel lm=new LoginModel();
		lm.setCustId("newuser");
		lm.setPassword("lalaqaqa");
		Mockito.when(this.custSer.validateUser(ArgumentMatchers.any())).thenReturn("Login success");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(lm);
	
		MvcResult res =  mvc.perform(post("/checkLogin")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Login success");
		System.out.println(result);
	}
	@Test
	public void testCheckBalance() throws Exception{
		Customer cust=new Customer();
		cust.setCustId("user0002");
		List<AccountBalance> resu=new ArrayList<AccountBalance>();
		AccountBalance accBal=new AccountBalance();
		accBal.setAccountNo("137526170820");
		accBal.setBalance(3000);
		resu.add(accBal);
		Mockito.when(this.custSer.checkBalance(ArgumentMatchers.any())).thenReturn(resu);
		mvc.perform(get("/checkBalance/{custId}","user0002").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$",Matchers.hasSize(1)))

		.andExpect(jsonPath("$[0].balance",Matchers.equalTo(3000)));	

	}
	@Test
	public void testUpdatePassword() throws Exception{
		Customer cust=new Customer();
		cust.setCustId("user0002");
		ChangePassword p=new ChangePassword();
		p.setPassword("user0002");
		Mockito.when(this.custSer.updatePassword(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("Password updated successfully");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(p);
		MvcResult res=mvc.perform(put("/updatePassword/{custId}","user0002")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Password updated successfully");
		System.out.println(result);

	}
	@Test
	public void testFetchAccounts() throws Exception{
		Customer cust=new Customer();
		cust.setCustId("user0002");
		List<String> resu=new ArrayList<String>();
		Account acc=new Account();
		acc.setAccountNo("137526170820");
		resu.add(acc.getAccountNo());
		Mockito.when(this.custSer.fetchAccounts(ArgumentMatchers.any())).thenReturn(resu);
		mvc.perform(get("/fetchAccounts/{custId}","user0002").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$",Matchers.hasSize(1)))
		.andExpect(jsonPath("$[0]",Matchers.equalTo("137526170820")));	

	}
	@Test
	public void testFetchCustomer() throws Exception{
		Customer obj=new Customer();
		obj.setCustId("newuser");
		obj.setFirstName("lala");
		obj.setLastName("qaqa");
		BigInteger a=new BigInteger("123456789123");
		obj.setAdhaarNumber(a);
		obj.setMiddleName(null);
		obj.setEmail("lala@gmail.com");
		obj.setFatherName("qaqa");
		obj.setPassword("lalaqaqa");
		obj.setPhone("9999999999");

		Account acc=new Account();
		acc.setBalance(3000);
		acc.setAccountNo("137526170820");
		acc.setCustomer(obj);
		acc.setDateClosed(null);
		Occupation occu=new Occupation();
		occu.setCustomer(obj);
		BigInteger x=new BigInteger("1234432");
		occu.setGrossAnnualSalary(x);
		occu.setOccupationType("teaching");
		occu.setSourceOfIncome("job");
		Address ad=new Address();
		ad.setAddressLine1("jdsf");
		ad.setAddressLine2("jdufud");
		ad.setAddressType("Permanent");
		ad.setCity("Aluva");
		ad.setCustomer(obj);
		ad.setLandmark("deduwh");
		ad.setPincode(683101);
		ad.setState("kl");
		UserDetails us=new UserDetails(obj,acc,ad,occu);
		List<UserDetails> use=new ArrayList<UserDetails>();
		use.add(us);
		Mockito.when(this.custSer.fetchCustomer(ArgumentMatchers.any())).thenReturn(use);
		mvc.perform(get("/fetchCustomer/{custId}","newuser").contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$",Matchers.hasSize(1)));

	}
	@Test
	public void testUpdateCustomer() throws Exception{
		Customer obj=new Customer();
		obj.setCustId("newuser");
		obj.setFirstName("lala");
		obj.setLastName("qaqa");
		BigInteger a=new BigInteger("123456789123");
		obj.setAdhaarNumber(a);
		obj.setMiddleName(null);
		obj.setEmail("lala@gmail.com");
		obj.setFatherName("qaqa");
		obj.setPassword("lalaqaqa");
		obj.setPhone("9999999999");
		Mockito.when(this.custSer.updateCustomer(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("successfully updated");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(obj);
		MvcResult res=mvc.perform(put("/updateCustomer/{custId}","user0002")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"successfully updated");
		System.out.println(result);
	}
	

	

}