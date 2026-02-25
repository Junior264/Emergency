package dev.ewald.worker.dto;

public record WorkRequest(String userHash, String notificationValue, String notificationType) {}