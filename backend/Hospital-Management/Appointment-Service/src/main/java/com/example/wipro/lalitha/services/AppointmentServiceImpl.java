package com.example.wipro.lalitha.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.wipro.lalitha.dto.AppointmentDTO;
import com.example.wipro.lalitha.dto.DoctorDTO;
import com.example.wipro.lalitha.dto.PatientDTO;
import com.example.wipro.lalitha.entities.Appointment;
import com.example.wipro.lalitha.exception.ResourceNotFoundException;
import com.example.wipro.lalitha.feign.DoctorServiceClient;
import com.example.wipro.lalitha.feign.PatientServiceClient;
import com.example.wipro.lalitha.mapper.AppointmentMapper;
import com.example.wipro.lalitha.repositories.AppointmentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private static final String APPOINTMENT_TOPIC = "appointment-events";

    @Autowired
    private PatientServiceClient patientServiceClient;

    @Autowired
    private DoctorServiceClient doctorServiceClient;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private KafkaTemplate<String, AppointmentDTO> kafkaTemplate;

    @Override
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        // Validate patientId via Feign client
        PatientDTO patient = patientServiceClient.getPatientById(dto.getPatientId());
        if (patient == null) {
            throw new ResourceNotFoundException("Patient not found with id " + dto.getPatientId());
        }

        // Validate doctorId via Feign client
        DoctorDTO doctor = doctorServiceClient.getDoctorById(dto.getDoctorId());
        if (doctor == null) {
            throw new ResourceNotFoundException("Doctor not found with id " + dto.getDoctorId());
        }

        Appointment appointment = AppointmentMapper.toEntity(dto);
        Appointment saved = appointmentRepository.save(appointment);
        AppointmentDTO savedDto = AppointmentMapper.toDTO(saved);
        kafkaTemplate.send(APPOINTMENT_TOPIC, savedDto);
        return savedDto;
    }

    @Override
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO dto) {
        // Validate patientId via Feign client
        PatientDTO patient = patientServiceClient.getPatientById(dto.getPatientId());
        if (patient == null) {
            throw new ResourceNotFoundException("Patient not found with id " + dto.getPatientId());
        }

        // Validate doctorId via Feign client
        DoctorDTO doctor = doctorServiceClient.getDoctorById(dto.getDoctorId());
        if (doctor == null) {
            throw new ResourceNotFoundException("Doctor not found with id " + dto.getDoctorId());
        }

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + id));
        appointment.setPatientId(dto.getPatientId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus(dto.getStatus());
        Appointment updated = appointmentRepository.save(appointment);
        AppointmentDTO updatedDto = AppointmentMapper.toDTO(updated);
        kafkaTemplate.send(APPOINTMENT_TOPIC, updatedDto);
        return updatedDto;
    }

    // Other methods remain unchanged
    @Override
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + id));
        return AppointmentMapper.toDTO(appointment);
    }

    @Override
    public List<AppointmentDTO> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(AppointmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id " + id));
        appointmentRepository.delete(appointment);
    }
}
