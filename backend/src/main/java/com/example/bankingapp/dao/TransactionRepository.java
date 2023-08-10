package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingapp.model.Transaction;

public interface TransactionRepository extends 
JpaRepository <Transaction,String> {

}
