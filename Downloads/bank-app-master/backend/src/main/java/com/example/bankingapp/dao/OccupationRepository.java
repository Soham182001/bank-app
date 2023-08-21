package com.example.bankingapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bankingapp.model.Occupation;

public interface OccupationRepository extends JpaRepository<Occupation, Integer> {

}
