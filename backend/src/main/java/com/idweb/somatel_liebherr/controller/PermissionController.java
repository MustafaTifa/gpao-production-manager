package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;
import com.idweb.somatel_liebherr.service.interfaces.PermissionInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {

    private final PermissionInterface permissionService;

    public PermissionController(PermissionInterface permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public ResponseEntity<List<PermissionResponseDTO>> getAll() {
        return ResponseEntity.ok(permissionService.getAll());
    }
}
