package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.DTOs.RoleRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.RoleResponseDTO;

import java.util.List;

public interface RoleInterface {
    List<RoleResponseDTO> getAll();
    RoleResponseDTO getById(Long id);
    RoleResponseDTO create(RoleRequestDTO request);
    RoleResponseDTO update(Long id, RoleRequestDTO request);
    void delete(Long id);
}
