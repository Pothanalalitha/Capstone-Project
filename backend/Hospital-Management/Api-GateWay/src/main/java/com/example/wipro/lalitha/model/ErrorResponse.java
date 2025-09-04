package com.example.wipro.lalitha.model;



import com.fasterxml.jackson.databind.ObjectMapper;

public class ErrorResponse {

    private int status;
    private String message;

    public ErrorResponse() {}

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public String toJson() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (Exception e) {
            return "{}";
        }
    }

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

   
}
