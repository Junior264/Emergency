package dev.ewald.worker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import dev.ewald.worker.dto.RequestMail;

@Service
public class MailService {
    @Value("{spring.mail.username}")
    private String username;

    @Autowired
    JavaMailSender mailSender;

    public void sendMail(RequestMail mail) {
        String subject = "Emergency Notification from: " + mail.username();
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(username);
        message.setTo(mail.recipient());
        message.setSubject(subject);
        message.setText(mail.message());
        
        mailSender.send(message);
    }
}
