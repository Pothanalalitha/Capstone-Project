package com.example.wipro.lalitha.services;

import java.util.List;

import com.example.wipro.lalitha.dto.AppointmentDTO;

public interface AppointmentService {

    AppointmentDTO createAppointment(AppointmentDTO dto);

    AppointmentDTO updateAppointment(Long id, AppointmentDTO dto);

    AppointmentDTO getAppointmentById(Long id);

    List<AppointmentDTO> getAppointmentsByDoctorId(Long doctorId);

    List<AppointmentDTO> getAppointmentsByPatientId(Long patientId);

    void deleteAppointment(Long id);

	List<AppointmentDTO> getAllAppointments();
}
