package com.example.wipro.lalitha.services;



import java.util.List;

import com.example.wipro.lalitha.dto.PatientRequestDTO;
import com.example.wipro.lalitha.dto.PatientResponseDTO;

public interface PatientService {

    List<PatientResponseDTO> getAllPatients();

    PatientResponseDTO getPatient(Long id);

    PatientResponseDTO addPatient(PatientRequestDTO dto);

    PatientResponseDTO updatePatient(Long id, PatientRequestDTO dto);

    void deletePatient(Long id) throws RuntimeException;
}
