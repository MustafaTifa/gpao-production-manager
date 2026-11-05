package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.DTOs.AssignRolesRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserResponseDTO;
import com.idweb.somatel_liebherr.service.interfaces.UserInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserInterface userService;

    public UserController(UserInterface userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }

    @PostMapping("/api/users")
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserRequestDTO request) {
        return ResponseEntity.status(201).body(userService.createUser(request));
    }

    @PutMapping("/api/users/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserRequestDTO request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/users/assign-roles")
    public ResponseEntity<Void> assignRoles(@RequestBody AssignRolesRequestDTO request) {
        userService.assignRoles(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/user/me")
    public ResponseEntity<UserDetails> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userDetails);
    }
}
