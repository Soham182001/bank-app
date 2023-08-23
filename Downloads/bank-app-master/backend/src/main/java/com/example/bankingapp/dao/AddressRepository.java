package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingapp.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
