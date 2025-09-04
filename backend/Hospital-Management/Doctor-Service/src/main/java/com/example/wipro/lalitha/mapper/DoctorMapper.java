package com.example.wipro.lalitha.mapper;

import com.example.wipro.lalitha.dto.DoctorDTO;
import com.example.wipro.lalitha.entities.Doctor;

public class DoctorMapper {

    public static DoctorDTO toDTO(Doctor doctor) {
        if (doctor == null) return null;
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialty(doctor.getSpecialty());
        dto.setEmail(doctor.getEmail());
        return dto;
    }

    public static Doctor toEntity(DoctorDTO dto) {
        if (dto == null) return null;
        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setSpecialty(dto.getSpecialty());
        doctor.setEmail(dto.getEmail());
        return doctor;
    }
}
