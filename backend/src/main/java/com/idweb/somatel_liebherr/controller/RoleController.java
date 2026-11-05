package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.DTOs.RoleRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.RoleResponseDTO;
import com.idweb.somatel_liebherr.service.interfaces.RoleInterface;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleInterface roleService;

    public RoleController(RoleInterface roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<RoleResponseDTO>> getAll() {
        return ResponseEntity.ok(roleService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getById(id));
    }

    @PostMapping
    public ResponseEntity<RoleResponseDTO> create(@RequestBody RoleRequestDTO request) {
        RoleResponseDTO created = roleService.create(request);
        return ResponseEntity.created(URI.create("/api/roles/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> update(@PathVariable Long id, @RequestBody RoleRequestDTO request) {
        return ResponseEntity.ok(roleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
