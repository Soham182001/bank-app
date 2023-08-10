package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingapp.model.Customer;

public interface CustomerRepository extends JpaRepository <Customer,String> {

}
