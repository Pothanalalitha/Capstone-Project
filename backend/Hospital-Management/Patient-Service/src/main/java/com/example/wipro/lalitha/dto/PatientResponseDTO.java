package com.example.wipro.lalitha.dto;

import java.time.LocalDate;
import java.util.List;

public class PatientResponseDTO {
    private Long id;
    private String name;
    private String address;
    private String gender;
    private LocalDate dob;
    private Double weight;
    private Double height;
    private List<MedicalRecordDTO> medicalRecords;

    public PatientResponseDTO() {
        super();
    }

    public PatientResponseDTO(Long id, String name, String address, String gender, LocalDate dob, Double weight,
                              Double height, List<MedicalRecordDTO> medicalRecords) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.gender = gender;
        this.dob = dob;
        this.weight = weight;
        this.height = height;
        this.medicalRecords = medicalRecords;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    public List<MedicalRecordDTO> getMedicalRecords() { return medicalRecords; }
    public void setMedicalRecords(List<MedicalRecordDTO> medicalRecords) { this.medicalRecords = medicalRecords; }
}
