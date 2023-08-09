package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingapp.model.Account;

public interface AccountRepository extends  JpaRepository <Account,String> {

}
