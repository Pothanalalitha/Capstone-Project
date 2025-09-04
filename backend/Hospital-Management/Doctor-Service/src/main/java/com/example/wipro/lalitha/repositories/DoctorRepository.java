package com.example.wipro.lalitha.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wipro.lalitha.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}