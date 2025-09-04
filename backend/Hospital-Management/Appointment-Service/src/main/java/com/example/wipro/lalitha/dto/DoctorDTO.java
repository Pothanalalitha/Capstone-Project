package com.example.wipro.lalitha.dto;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DoctorDTO {

    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 100)
    private String specialty;

    @NotBlank
    @Size(max = 100)
    private String email;

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

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public DoctorDTO() {
		super();
	}

	public DoctorDTO(Long id, @NotBlank @Size(max = 100) String name, @NotBlank @Size(max = 100) String specialty,
			@NotBlank @Size(max = 100) String email) {
		super();
		this.id = id;
		this.name = name;
		this.specialty = specialty;
		this.email = email;
	}
    
    
}
