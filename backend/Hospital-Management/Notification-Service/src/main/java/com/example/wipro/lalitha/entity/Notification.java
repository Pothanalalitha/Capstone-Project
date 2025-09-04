package com.example.wipro.lalitha.entity;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;
    private Long appointmentId;
    private Long patientId;
    private String message;
    private String type; // EMAIL or SMS
    private String recipient;
    private String status; // PENDING, SENT, FAILED
    private LocalDateTime createdAt;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public Notification() {
		super();
	}
	public Notification(String id, Long appointmentId, Long patientId, String message, String type, String recipient,
			String status, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.appointmentId = appointmentId;
		this.patientId = patientId;
		this.message = message;
		this.type = type;
		this.recipient = recipient;
		this.status = status;
		this.createdAt = createdAt;
	}

    
}
