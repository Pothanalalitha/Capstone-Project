package com.example.wipro.lalitha.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long patientId;

    @NotNull
    private Long doctorId;

    @NotNull
    @FutureOrPresent
    private LocalDateTime appointmentTime;

    @NotBlank
    private String status;  

    

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public LocalDateTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalDateTime appointmentTime) { this.appointmentTime = appointmentTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
	public Appointment() {
		super();
	}
	public Appointment(@NotNull Long patientId, @NotNull Long doctorId,
			@NotNull @FutureOrPresent LocalDateTime appointmentTime, @NotBlank String status) {
		super();
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.appointmentTime = appointmentTime;
		this.status = status;
	}
	
    
}

