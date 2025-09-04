package com.example.wipro.lalitha.mapper;

import com.example.wipro.lalitha.dto.AppointmentDTO;
import com.example.wipro.lalitha.entities.Appointment;

public class AppointmentMapper {

    public static AppointmentDTO toDTO(Appointment appointment) {
        if (appointment == null) return null;
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setPatientId(appointment.getPatientId());
        dto.setDoctorId(appointment.getDoctorId());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setStatus(appointment.getStatus());
        return dto;
    }

    public static Appointment toEntity(AppointmentDTO dto) {
        if (dto == null) return null;
        Appointment appointment = new Appointment();
        appointment.setPatientId(dto.getPatientId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus(dto.getStatus());
        return appointment;
    }
}

