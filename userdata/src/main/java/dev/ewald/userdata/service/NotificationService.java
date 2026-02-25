package dev.ewald.userdata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import dev.ewald.userdata.model.Notification;
import dev.ewald.userdata.model.NotificationRequest;
import dev.ewald.userdata.model.NotificationResponse;
import dev.ewald.userdata.model.NotificationWorkerRequest;
import dev.ewald.userdata.repository.NotificationRepository;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public List<NotificationResponse> getAllNotifications(String userHash) {

        return notificationRepository.findAllByUserHash(userHash)
            .stream()
            .map(notification -> new NotificationResponse(notification.getId(), notification.getType(), notification.getNotificationValue()))
            .toList();
    }

    public String createNotification(NotificationRequest notification, String userId) {
        Notification newNotification = new Notification();
        newNotification.setNotificationValue(notification.notificationValue());
        newNotification.setType(notification.notificationType());
        newNotification.setUserHash(userId);

        notificationRepository.save(newNotification);

        return "Created successfully.";
    }

    public String updateNotifications(Long id, NotificationRequest notification) {
        Notification updateNotification = notificationRepository.findById(id)
            .orElseThrow(RuntimeException::new);

        updateNotification.setNotificationValue(notification.notificationValue());
        updateNotification.setType(notification.notificationType());

        notificationRepository.save(updateNotification);

        return "Updated successfully.";

    }
    
    public String deleteNotification(Long id) {
        Notification deleteNotification = notificationRepository.findById(id)
            .orElseThrow(RuntimeException::new);
        notificationRepository.delete(deleteNotification);

        return "Deleted successfully.";
    }

    public void triggerEmergency(String userHash) {
        List<Notification> settings = notificationRepository.findAllByUserHash(userHash);

        for (Notification setting : settings) {
            NotificationWorkerRequest request = new NotificationWorkerRequest(
                userHash,
                setting.getNotificationValue(), 
                setting.getType()
            );

            kafkaTemplate.send("emergency-topic", request);
        }
    }
}
