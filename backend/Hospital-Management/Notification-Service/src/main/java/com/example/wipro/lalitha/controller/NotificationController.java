package com.example.wipro.lalitha.controller;

import com.example.wipro.lalitha.dto.NotificationDTO;
import com.example.wipro.lalitha.service.NotificationService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/getAllNotifications")
    public List<NotificationDTO> getAllNotifications() {
        logger.info("Fetching all notifications");
        return notificationService.getAllNotifications();
    }
}
