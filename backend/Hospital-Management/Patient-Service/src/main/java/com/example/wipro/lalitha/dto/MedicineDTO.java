package com.example.wipro.lalitha.dto;

public class MedicineDTO {
    private String id;
    private String name;
    private Integer quantity;
    private String time;

    public MedicineDTO() {
        super();
    }

    public MedicineDTO(String id, String name, Integer quantity, String time) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.time = time;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}
