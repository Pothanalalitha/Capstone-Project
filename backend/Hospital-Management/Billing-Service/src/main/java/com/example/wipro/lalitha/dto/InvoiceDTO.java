package com.example.wipro.lalitha.dto;

public class InvoiceDTO {
    private Long id;
    private Long appointmentId;
    private Long patientId;
    private Double amount;
    private String status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public InvoiceDTO() {
		super();
	}
	public InvoiceDTO(Long id, Long appointmentId, Long patientId, Double amount, String status) {
		super();
		this.id = id;
		this.appointmentId = appointmentId;
		this.patientId = patientId;
		this.amount = amount;
		this.status = status;
	}

    
}

