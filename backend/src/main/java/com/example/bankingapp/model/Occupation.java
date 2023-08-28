package com.example.bankingapp.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "occupation_info")
public class Occupation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sNo;

    @ManyToOne
    @JoinColumn(name = "custId")
    private Customer customer;

    @Column(nullable = false)
    @NotBlank(message="Occupation type cannot be blank")
    private String occupationType;

    @Column(nullable = false)
    @NotBlank(message="source of income cannot be blank")
    private String sourceOfIncome;

    @Column(nullable = false)
    @NotBlank(message="Gross annual salary cannot be blank")
    private BigInteger grossAnnualSalary;

    // Getters and setters

	@JsonBackReference
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public BigInteger getGrossAnnualSalary() {
        return grossAnnualSalary;
    }

    public void setGrossAnnualSalary(BigInteger grossAnnualSalary) {
        this.grossAnnualSalary = grossAnnualSalary;
    }

    public String getSourceOfIncome() {
        return sourceOfIncome;
    }

    public void setSourceOfIncome(String sourceOfIncome) {
        this.sourceOfIncome = sourceOfIncome;
    }

    public String getOccupationType() {
        return occupationType;
    }

    public void setOccupationType(String occupationType) {
        this.occupationType = occupationType;
    }

}
