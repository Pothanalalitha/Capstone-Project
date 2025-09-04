package com.example.wipro.lalitha.service;

import com.example.wipro.lalitha.dto.NotificationDTO;
import java.util.List;

public interface NotificationService {
    void processNotification(NotificationDTO notificationDTO);
    List<NotificationDTO> getAllNotifications();
}
