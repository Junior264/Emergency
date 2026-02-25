package dev.ewald.userdetails.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.ewald.userdetails.dto.AuthUserResponse;
import dev.ewald.userdetails.dto.UserRequest;
import dev.ewald.userdetails.dto.UserResponse;
import dev.ewald.userdetails.service.UserService;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthUserResponse login(@RequestBody UserRequest user) {
        return userService.verify(user);
    }
    
    @PutMapping("/refresh/{token}")
    @ResponseStatus(HttpStatus.OK)
    public String refresh(@PathVariable String token) {
        return userService.refreshToken(token);
    }

    @DeleteMapping("/delete/{username}")
    @ResponseStatus(HttpStatus.OK)
    public String delete(@PathVariable String username) {
        return userService.delete(username);
    }  
}
