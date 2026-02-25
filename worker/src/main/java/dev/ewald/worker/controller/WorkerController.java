package dev.ewald.worker.controller;

import org.springframework.web.bind.annotation.RestController;

import dev.ewald.worker.dto.RequestMail;
import dev.ewald.worker.dto.WorkRequest;
import dev.ewald.worker.service.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;


@RestController
public class WorkerController {
    @Autowired
    private MailService mailService;

    @KafkaListener(topics = "emergency-topic", groupId = "worker-group")
    public void handleEmergency(WorkRequest setting) {
        try {
            if ("EMAIL".equals(setting.notificationType())) {
                RequestMail tmpMail = new RequestMail(setting.userHash(), "Test Notification! :)", setting.notificationValue());

                mailService.sendMail(tmpMail);
            } else if ("SMS".equals(setting.notificationType())) {
                System.out.println("Sende SMS an: " + setting.notificationValue());
            }
        } catch (Exception e) {
            System.err.println("Fehler beim Versand: " + e.getMessage());
        }
    }
}
