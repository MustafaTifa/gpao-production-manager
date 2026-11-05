package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Role;
import com.idweb.somatel_liebherr.model.User;
import com.idweb.somatel_liebherr.model.DTOs.AssignRolesRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;
import com.idweb.somatel_liebherr.model.DTOs.RoleResponseDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserResponseDTO;
import com.idweb.somatel_liebherr.repository.RoleRepository;
import com.idweb.somatel_liebherr.repository.UserRepository;
import com.idweb.somatel_liebherr.service.interfaces.UserInterface;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserInterface {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserResponseDTO> getAll() {
        return userRepository.findAll().stream()
                .map(this::toUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponseDTO createUser(UserRequestDTO request) {
        User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()));
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            List<Long> roleIds = request.getRoles().stream()
                    .map(RoleResponseDTO::getId)
                    .collect(Collectors.toList());
            List<Role> roles = roleRepository.findAllById(roleIds);
            user.setRoles(new HashSet<>(roles));
        }
        return toUserResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(Long id, UserRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            user.setUsername(request.getUsername());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRoles() != null) {
            List<Long> roleIds = request.getRoles().stream()
                    .map(RoleResponseDTO::getId)
                    .collect(Collectors.toList());
            user.setRoles(new HashSet<>(roleRepository.findAllById(roleIds)));
        }
        return toUserResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void assignRoles(AssignRolesRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + request.getUserId()));
        List<Role> roles = roleRepository.findAllById(request.getRoleIds() != null ? request.getRoleIds() : List.of());
        user.setRoles(new HashSet<>(roles));
        userRepository.save(user);
    }

    private UserResponseDTO toUserResponse(User user) {
        List<RoleResponseDTO> roles = user.getRoles().stream()
                .map(role -> {
                    List<PermissionResponseDTO> perms = role.getPermissions().stream()
                            .map(p -> new PermissionResponseDTO(p.getId(), p.getName(), p.getRoute(), p.getIcon(), p.getDescription()))
                            .collect(Collectors.toList());
                    return new RoleResponseDTO(role.getId(), role.getName(), role.getDescription(), perms);
                })
                .collect(Collectors.toList());
        return new UserResponseDTO(user.getId(), user.getUsername(), roles);
    }
}
