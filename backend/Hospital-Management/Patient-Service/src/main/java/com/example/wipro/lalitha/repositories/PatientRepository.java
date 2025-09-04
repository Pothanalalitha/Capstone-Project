package com.example.wipro.lalitha.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.wipro.lalitha.entites.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
