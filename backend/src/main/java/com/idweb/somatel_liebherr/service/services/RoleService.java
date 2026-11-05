package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Permission;
import com.idweb.somatel_liebherr.model.Role;
import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;
import com.idweb.somatel_liebherr.model.DTOs.RoleRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.RoleResponseDTO;
import com.idweb.somatel_liebherr.repository.PermissionRepository;
import com.idweb.somatel_liebherr.repository.RoleRepository;
import com.idweb.somatel_liebherr.repository.UserRepository;
import com.idweb.somatel_liebherr.service.interfaces.RoleInterface;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService implements RoleInterface {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;

    public RoleService(RoleRepository roleRepository,
                       PermissionRepository permissionRepository,
                       UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<RoleResponseDTO> getAll() {
        return roleRepository.findAll().stream()
                .map(this::toRoleResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponseDTO getById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found: " + id));
        return toRoleResponse(role);
    }

    @Override
    @Transactional
    public RoleResponseDTO create(RoleRequestDTO request) {
        Set<Permission> permissions = new HashSet<>(
                permissionRepository.findAllById(request.getPermissionIds() != null ? request.getPermissionIds() : List.of())
        );
        Role role = new Role(request.getName(), request.getDescription());
        role.setPermissions(permissions);
        return toRoleResponse(roleRepository.save(role));
    }

    @Override
    @Transactional
    public RoleResponseDTO update(Long id, RoleRequestDTO request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found: " + id));
        role.setName(request.getName());
        role.setDescription(request.getDescription());
        Set<Permission> permissions = new HashSet<>(
                permissionRepository.findAllById(request.getPermissionIds() != null ? request.getPermissionIds() : List.of())
        );
        role.setPermissions(permissions);
        return toRoleResponse(roleRepository.save(role));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found: " + id));
        role.getUsers().forEach(u -> u.getRoles().remove(role));
        userRepository.saveAll(role.getUsers());
        roleRepository.delete(role);
    }

    private RoleResponseDTO toRoleResponse(Role role) {
        List<PermissionResponseDTO> perms = role.getPermissions().stream()
                .map(p -> new PermissionResponseDTO(p.getId(), p.getName(), p.getRoute(), p.getIcon(), p.getDescription()))
                .collect(Collectors.toList());
        return new RoleResponseDTO(role.getId(), role.getName(), role.getDescription(), perms);
    }
}
