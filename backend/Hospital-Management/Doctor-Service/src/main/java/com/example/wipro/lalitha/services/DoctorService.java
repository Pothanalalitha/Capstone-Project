package com.example.wipro.lalitha.services;

import java.util.List;

import com.example.wipro.lalitha.dto.DoctorDTO;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO doctorDTO);
    DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO);
    DoctorDTO getDoctorById(Long id);
    List<DoctorDTO> getAllDoctors();
    void deleteDoctor(Long id);
}
