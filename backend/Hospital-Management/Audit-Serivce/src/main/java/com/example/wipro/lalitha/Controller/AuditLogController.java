package com.example.wipro.lalitha.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.wipro.lalitha.Service.Auditserivce;
import com.example.wipro.lalitha.entites.AuditLog;

@RestController
@RequestMapping("/api/auditlogs")
public class AuditLogController {

    @Autowired
    private Auditserivce auditLogService;

    @PostMapping("/save")
    public AuditLog saveAuditLog(@RequestBody AuditLog auditLog) {
    	System.out.println("value > "+auditLog.getAction());
        AuditLog savedLog = auditLogService.saveAuditLog(auditLog);
        return savedLog;
    }
}

