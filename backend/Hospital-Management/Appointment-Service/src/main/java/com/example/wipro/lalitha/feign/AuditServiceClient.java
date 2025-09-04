package com.example.wipro.lalitha.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.wipro.lalitha.dto.AuditLogDTO;



@FeignClient(name = "AUDITLOGS-SERVICE")
public interface AuditServiceClient {

    @PostMapping("/api/auditlogs/save")
    AuditLogDTO saveAuditLog(@RequestBody AuditLogDTO auditLog);
}
