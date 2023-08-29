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
import com.example.bankingapp.controller.AddressController;
import com.example.bankingapp.controller.AdminController;
import com.example.bankingapp.controller.CustController;
import com.example.bankingapp.controller.OccupationController;
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
import com.example.bankingapp.service.AddressService;
import com.example.bankingapp.service.AdminService;
import com.example.bankingapp.service.CustService;
import com.example.bankingapp.service.OccupationService;
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


public class OccupationControllerTest {
	@Autowired
	private MockMvc mvc ;

	@InjectMocks
	private OccupationController occuController;
	@Mock
	private OccupationService occuSer;
	
	@BeforeEach
	public void setup() {
		mvc=MockMvcBuilders.standaloneSetup(occuController).build();
	}
	@Test
	public void testUpdateOccupation() throws Exception{
		Occupation occu=new Occupation();
		BigInteger x=new BigInteger("1234432");
		occu.setGrossAnnualSalary(x);
		occu.setOccupationType("teaching");
		occu.setSourceOfIncome("job");
		Mockito.when(this.occuSer.updateOccupation(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn("successfully updated");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(occu);
		MvcResult res=mvc.perform(put("/updateOccupation/{custId}","user0002")
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
