package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
