package dev.ewald.userdetails.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.ewald.userdetails.dto.UserDetailsResponse;
import dev.ewald.userdetails.service.UserDetailsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;



@RestController
@RequestMapping("/details")
public class UserDetailsController {
    @Autowired
    private UserDetailsService userdetailsService;

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public void updateUserDetails(
        @RequestHeader("id") String userId,
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("age") Integer age,
        @RequestParam(value = "image", required = false) MultipartFile image) throws IOException
    { 
        userdetailsService.updateUserDetails(userId, firstName, lastName, age, image);

    }
    
    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserDetailsResponse getUserData(@RequestHeader("id") String username) {
        return userdetailsService.getData(username);
    }
}
