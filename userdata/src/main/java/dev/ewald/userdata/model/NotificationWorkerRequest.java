package dev.ewald.userdata.model;

public record NotificationWorkerRequest(String userHash, String notificationValue, NotificationType notificationType) {}
