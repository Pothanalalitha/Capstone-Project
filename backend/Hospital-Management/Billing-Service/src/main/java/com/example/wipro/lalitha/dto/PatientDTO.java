package com.example.wipro.lalitha.dto;



import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class PatientDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Address is required")
    @Size(max = 255)
    private String address;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "Male|Female|Other")
    private String gender;

    @NotNull(message = "Date of Birth is required")
    @Past(message = "Date of Birth must be in the past")
    private LocalDate dob;

    @NotNull(message = "Weight is required")
    @DecimalMin("0.1")
    private Double weight;

    @NotNull(message = "Height is required")
    @DecimalMin("0.1")
    private Double height;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
    

	public PatientDTO() {
		super();
	}

	public PatientDTO(Long id, @NotBlank(message = "Name is required") @Size(max = 100) String name,
			@NotBlank(message = "Address is required") @Size(max = 255) String address,
			@NotBlank(message = "Gender is required") @Pattern(regexp = "Male|Female|Other") String gender,
			@NotNull(message = "Date of Birth is required") @Past(message = "Date of Birth must be in the past") LocalDate dob,
			@NotNull(message = "Weight is required") @DecimalMin("0.1") Double weight,
			@NotNull(message = "Height is required") @DecimalMin("0.1") Double height) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.gender = gender;
		this.dob = dob;
		this.weight = weight;
		this.height = height;
	}
    
    
}
