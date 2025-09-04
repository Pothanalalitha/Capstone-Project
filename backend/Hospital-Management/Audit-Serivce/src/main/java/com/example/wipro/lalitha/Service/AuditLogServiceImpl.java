package com.example.wipro.lalitha.Service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.wipro.lalitha.Repo.AuditLogsRepository;
import com.example.wipro.lalitha.entites.AuditLog;

@Service
public class AuditLogServiceImpl implements Auditserivce {

    @Autowired
    private AuditLogsRepository auditLogRepository;

    @Override
    public AuditLog saveAuditLog(AuditLog auditLog) {
    	if(auditLog.getTimestamp() == null) {
    		auditLog.setTimestamp(LocalDateTime.now());
    	}
        return auditLogRepository.save(auditLog);
    }
}
