package com.example.wipro.lalitha.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.example.wipro.lalitha.dto.InvoiceDTO;
import com.example.wipro.lalitha.service.BillingService;


import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AppointmentEventListener {

    private static final Logger logger = LoggerFactory.getLogger(AppointmentEventListener.class);

    @Autowired
    private BillingService billingService;

    @KafkaListener(topics = "appointment-events", groupId = "billing-group")
    public void consumeAppointmentEvent(InvoiceDTO invoiceDTO) {
        logger.info("Received appointment event for billing: {}", invoiceDTO.getAppointmentId());
        billingService.processAppointmentEvent(invoiceDTO);
    }
}
