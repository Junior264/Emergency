package dev.ewald.userdetails.service;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.ewald.userdetails.dto.UserDetailsResponse;
import dev.ewald.userdetails.model.User;
import dev.ewald.userdetails.repository.UserRepository;

@Service
public class UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public void updateUserDetails(String username, String firstName, String lastName, Integer age, MultipartFile image) throws IOException{
        User user = userRepository.findByUsername(username);
        
        if (user == null) {
            throw new RuntimeException("User nicht gefunden");
        }
        
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setAge(age);

        if (image != null && !image.isEmpty()) {
            user.setPersonalImage(image.getBytes());
        }

        userRepository.save(user);
    }

    public UserDetailsResponse getData(String username) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User nicht gefunden");
        }

        String base64Image = null;

        if (user.getPersonalImage() != null) {
            base64Image = Base64.getEncoder().encodeToString(user.getPersonalImage());
        }

        return new UserDetailsResponse(
            user.getFirstName(), 
            user.getLastName(), 
            base64Image
        );
    }
}
