package dev.ewald.userdetails.dto;

public record UserRequest(String username, String password, String refreshToken) {}
