package com.example.wipro.lalitha.service;

import com.example.wipro.lalitha.dto.NotificationDTO;
import com.example.wipro.lalitha.entity.Notification;
import com.example.wipro.lalitha.exception.NotificationException;
import com.example.wipro.lalitha.repository.NotificationRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    private static final String CIRCUIT_BREAKER = "notificationServiceCB";

    @Override
    @CircuitBreaker(name = CIRCUIT_BREAKER, fallbackMethod = "notificationFallback")
    public void processNotification(NotificationDTO dto) {
        Notification notification = mapDtoToEntity(dto);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setStatus("PENDING");

        try {
            sendEmail(notification);
            notification.setStatus("SENT");
            logger.info("Notification sent for appointment {}", notification.getAppointmentId());
        } catch (Exception ex) {
            logger.error("Failed to send notification", ex);
            notification.setStatus("FAILED");
            throw new NotificationException("Notification sending failed");
        } finally {
            notificationRepository.save(notification);
        }
    }

    private void sendEmail(Notification notification) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(notification.getRecipient());
        message.setSubject("Appointment Notification");
        message.setText(notification.getMessage());
        javaMailSender.send(message);
    }

    @Override
    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    private Notification mapDtoToEntity(NotificationDTO dto) {
        Notification notif = new Notification();
        notif.setAppointmentId(dto.getAppointmentId());
        notif.setPatientId(dto.getPatientId());
        notif.setMessage(dto.getMessage());
        notif.setType(dto.getType());
        notif.setRecipient(dto.getRecipient());
        notif.setStatus(dto.getStatus());
        notif.setCreatedAt(dto.getCreatedAt());
        return notif;
    }

    private NotificationDTO mapEntityToDto(Notification entity) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(entity.getId());
        dto.setAppointmentId(entity.getAppointmentId());
        dto.setPatientId(entity.getPatientId());
        dto.setMessage(entity.getMessage());
        dto.setType(entity.getType());
        dto.setRecipient(entity.getRecipient());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    public void notificationFallback(NotificationDTO dto, Throwable t) {
        logger.error("Notification fallback for appointment {} due to {}", dto.getAppointmentId(), t.toString());
        // Additional fallback logic if needed
    }
}
