package com.example.bankingapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "occupation_info")
public class Occupation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sNo;

    @OneToOne
    @JoinColumn(name = "custId")
    private Customer customer;

    @Column(nullable = false)
    private String occupationType;

    @Column(nullable = false)
    private String sourceOfIncome;

    @Column(nullable = false)
    private Integer grossAnnualSalary;

    public Integer getGrossAnnualSalary() {
        return grossAnnualSalary;
    }

    public void setGrossAnnualSalary(Integer grossAnnualSalary) {
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
