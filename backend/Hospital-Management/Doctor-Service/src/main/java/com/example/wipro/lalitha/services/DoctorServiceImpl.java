package com.example.wipro.lalitha.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.wipro.lalitha.dto.DoctorDTO;
import com.example.wipro.lalitha.entities.Doctor;
import com.example.wipro.lalitha.exception.ResourceNotFoundException;
import com.example.wipro.lalitha.mapper.DoctorMapper;
import com.example.wipro.lalitha.repositories.DoctorRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = DoctorMapper.toEntity(doctorDTO);
        Doctor saved = doctorRepository.save(doctor);
        return DoctorMapper.toDTO(saved);
    }

    @Override
    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id " + id));
        doctor.setName(doctorDTO.getName());
        doctor.setSpecialty(doctorDTO.getSpecialty());
        doctor.setEmail(doctorDTO.getEmail());
        Doctor updated = doctorRepository.save(doctor);
        return DoctorMapper.toDTO(updated);
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id " + id));
        return DoctorMapper.toDTO(doctor);
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(DoctorMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id " + id));
        doctorRepository.delete(doctor);
    }
}

