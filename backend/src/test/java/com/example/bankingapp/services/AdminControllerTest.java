package com.example.bankingapp.services;


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

import com.example.bankingapp.controller.AdminController;
import com.example.bankingapp.controller.CustController;
import com.example.bankingapp.controller.TransactionController;
import com.example.bankingapp.model.AccountUpdateModel;
import com.example.bankingapp.model.Admin;
import com.example.bankingapp.model.AdminLoginModel;
import com.example.bankingapp.model.ChangePassword;
import com.example.bankingapp.model.Customer;
import com.example.bankingapp.model.LoginModel;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.Month;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)

public class AdminControllerTest {
	@Autowired
	private MockMvc mvc ;

	@InjectMocks
	private AdminController adminController;
	@Mock
	private AdminService adminSer;
	
	@BeforeEach
	public void setup() {
		mvc=MockMvcBuilders.standaloneSetup(adminController).build();
	}

	@Test
	public void testSaveAdmin() throws Exception{
		 Admin adm=new Admin();
		adm.setFirstName("newadm");
		adm.setLastName("a");
		adm.setEmail("newadm@gmail.com");
		adm.setEmpId("emp0001");
		adm.setMiddleName(null);
		adm.setPassword("emp0001");		
		adm.setPhone("987654321098");;

		Mockito.when(this.adminSer.saveAdmin(ArgumentMatchers.any())).thenReturn("inserted successfully");
		ObjectMapper mapper = new ObjectMapper();

		String json = mapper.writeValueAsString(adm);
	
		MvcResult res =  mvc.perform(post("/saveAdmin")
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
	public void testCheckLoginAdmin() throws Exception{
		AdminLoginModel admlm=new AdminLoginModel();
		admlm.setEmpId("newadmin");
		admlm.setPassword("emp0001");
		Mockito.when(this.adminSer.validateAdmin(ArgumentMatchers.any())).thenReturn("Login success");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(admlm);
	
		MvcResult res =  mvc.perform(post("/checkLoginAdmin")
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
	public void testUpdatePasswordAdmin() throws Exception{
		Admin adm=new Admin();
		adm.setEmpId("emp0002");
		ChangePassword p=new ChangePassword();
		p.setPassword("emp0002");
		Mockito.when(this.adminSer.updatePasswordAdmin(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("Password updated successfully");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(p);
		MvcResult res=mvc.perform(put("/updatePasswordAdmin/{empId}","emp0002")
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		String result = res.getResponse().getContentAsString();
		assertEquals(result,"Password updated successfully");
		System.out.println(result);

	}


}
