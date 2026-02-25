package dev.ewald.userdata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.ewald.userdata.model.NotificationRequest;
import dev.ewald.userdata.model.NotificationResponse;
import dev.ewald.userdata.service.NotificationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationResponse> getAllNotifications(@RequestHeader("id") String userId) {
        return notificationService.getAllNotifications(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createNotification(@RequestBody NotificationRequest notification, @RequestHeader("id") String userId) {
        System.out.println(userId);
        return notificationService.createNotification(notification, userId);
    }
    
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public String updateNotifications(Long id, NotificationRequest notification) {
        return notificationService.updateNotifications(id, notification);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public String deleteNotification(Long id) {
        return notificationService.deleteNotification(id);
    }

    @PostMapping("/emergency")
    public void triggerEmergency(@RequestHeader("id") String userId) {
    System.out.println("Trigger für User: " + userId);
        notificationService.triggerEmergency(userId);
    }
}
