package dev.ewald.userdetails.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dev.ewald.userdetails.dto.AuthUserResponse;
import dev.ewald.userdetails.dto.UserRequest;
import dev.ewald.userdetails.dto.UserResponse;
import dev.ewald.userdetails.model.User;
import dev.ewald.userdetails.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserResponse register(UserRequest user) {
        User newUser = new User();

        newUser.setUsername(user.username());
        newUser.setActivated(false);
        newUser.setPassword(encoder.encode(user.password()));
        newUser.setRole("USER");
        
        userRepository.save(newUser);

        return new UserResponse(newUser.getId(), newUser.getUsername(), newUser.isActivated());
    }

    public AuthUserResponse verify(UserRequest user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.username(), user.password()));
        
        if (authentication.isAuthenticated()) {
            String generatedAccessToken = jwtService.generateTokenAccess(user.username());
            String generatedRefreshToken = jwtService.generateTokenRefresh(user.username());
            User updateUser = userRepository.findByUsername(user.username());

            setRefreshTokenToUser(updateUser, generatedRefreshToken);

            return new AuthUserResponse(updateUser.getId(), updateUser.getUsername(), updateUser.isActivated(), generatedAccessToken, generatedRefreshToken);
        }

        return new AuthUserResponse(null, null, null, null, null);
    }

    public String refreshToken(String token) {
        User refreshUser = userRepository.findByRefreshToken(token);

        return jwtService.generateTokenAccess(refreshUser.getUsername());

    }

    public String delete(String username) {
        User deleteUser = userRepository.findByUsername(username);
        userRepository.delete(deleteUser);

        return "User deleted successfully.";
    }

    private void setRefreshTokenToUser(User user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }
}
