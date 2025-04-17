package dev.ewald.api_gateway.utils;

import dev.ewald.api_gateway.model.Credential;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class AuthUtil {

    @Autowired
    private RestTemplate restTemplate;

    public String getToken(String userName, String role) {
        HttpHeaders headers = new HttpHeaders();

        headers.set("userName", userName);
        headers.set("role", role);

        HttpEntity<Credential> request = new HttpEntity<>(
                new Credential("test", "admin"), headers);
        
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:8080/login", HttpMethod.POST, request, String.class);
        System.out.println("token: " + response.getBody());

        return response.getBody();
    }
}
