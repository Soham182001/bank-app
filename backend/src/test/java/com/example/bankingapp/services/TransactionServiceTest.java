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

import com.example.bankingapp.controller.TransactionController;
import com.example.bankingapp.model.AccountUpdateModel;
import com.example.bankingapp.model.Transaction;
import com.example.bankingapp.model.TransactionModel;
import com.example.bankingapp.service.AccountService;
import com.example.bankingapp.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class TransactionServiceTest {
	
	@Autowired
	private MockMvc mvc ;

	@InjectMocks
	private TransactionController transactionController;
	@Mock
	private TransactionService transSer;
	
	@BeforeEach
	public void setup() {
		mvc=MockMvcBuilders.standaloneSetup(transactionController).build();
	}

	@Test
	public void testTransaction() throws Exception{
		AccountUpdateModel acm = new AccountUpdateModel();
		acm.setSendersAccount("382938293829");
		acm.setRecieverAccount("382938293829");
		acm.setAmount(20);
		
		Transaction tx = new Transaction();
		
		tx.setTimeStamp("2023-03-09");
		tx.setTransactionId("3473847384738473");
		tx.setAmount(20);
		tx.setStatus("in progress");
		tx.setType("withdrawal");
		
		TransactionModel tm = new TransactionModel();
		tm.setAccountUpdateModel(acm);
		tm.setTransaction(tx);
		
		Mockito.when(this.transSer.transaction(ArgumentMatchers.any())).thenReturn("Withdrawal Success");
		
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(tm);
	
		MvcResult res = ((ResultActions) ((MockHttpServletRequestBuilder) this.mvc.perform(post("/transaction")))
		.contentType(MediaType.APPLICATION_JSON)
		.characterEncoding("utf-8")
		.content(json)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk()).andReturn();
		
//		String result = mvcRes.getResponse().getContentAsString();
////		assertEquals(result,"");
//		System.out.println(result);
	
	}
	
}
