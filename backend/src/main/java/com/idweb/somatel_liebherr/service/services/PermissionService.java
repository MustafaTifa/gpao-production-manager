package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;
import com.idweb.somatel_liebherr.repository.PermissionRepository;
import com.idweb.somatel_liebherr.service.interfaces.PermissionInterface;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionService implements PermissionInterface {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public List<PermissionResponseDTO> getAll() {
        return permissionRepository.findAll().stream()
                .map(p -> new PermissionResponseDTO(p.getId(), p.getName(), p.getRoute(), p.getIcon(), p.getDescription()))
                .collect(Collectors.toList());
    }
}
