package com.example.wipro.lalitha.Repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.wipro.lalitha.entites.AuditLog;

@Repository
public interface AuditLogsRepository extends MongoRepository<AuditLog, String> {
}
