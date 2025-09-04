package com.example.wipro.lalitha.kafka;

import com.example.wipro.lalitha.dto.NotificationDTO;
import com.example.wipro.lalitha.service.NotificationService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventListener {

    private static final Logger logger = LoggerFactory.getLogger(NotificationEventListener.class);

    @Autowired
    private NotificationService notificationService;

    @KafkaListener(topics = "appointment-events", groupId = "notification-group")
    public void listen(NotificationDTO notificationDTO) {
        logger.info("Received appointment event for notification: {}", notificationDTO.getAppointmentId());
        notificationService.processNotification(notificationDTO);
    }
}
