package com.example.wipro.lalitha.entites;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "audit_logs")
public class AuditLog {

    @Id
    private String id;  // MongoDB IDs are usually Strings (ObjectId)

    private String userId;

    private LocalDateTime timestamp;

    @JsonProperty("action")
    private String action;

    private String entityName;

    private String details;

    // Constructors
    public AuditLog() {}

    public AuditLog(String userId, LocalDateTime timestamp, String action, String entityName, String details) {
        this.userId = userId;
        this.timestamp = timestamp;
        this.action = action;
        this.entityName = entityName;
        this.details = details;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
