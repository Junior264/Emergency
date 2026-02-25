package dev.ewald.userdetails.dto;

public record AuthUserResponse(Long id, String name, Boolean isActivated, String accessToken, String refreshToken) {}
