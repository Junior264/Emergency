package dev.ewald.userdetails.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.ewald.userdetails.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
   User findByUsername(String username);
   User findByRefreshToken(String token);
}
