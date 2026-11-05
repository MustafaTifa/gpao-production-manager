package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.User;
import com.idweb.somatel_liebherr.model.DTOs.LoginRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.LoginResponseDTO;
import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;
import com.idweb.somatel_liebherr.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtUtils.generateToken(user);

            List<String> roles = user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            List<PermissionResponseDTO> permissions = user.getRoles().stream()
                    .flatMap(r -> r.getPermissions().stream())
                    .distinct()
                    .map(p -> new PermissionResponseDTO(p.getId(), p.getName(), p.getRoute(), p.getIcon(), p.getDescription()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new LoginResponseDTO(token, user.getUsername(), roles, permissions));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        }
    }
}
