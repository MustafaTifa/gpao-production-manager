package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.DTOs.PermissionResponseDTO;

import java.util.List;

public interface PermissionInterface {
    List<PermissionResponseDTO> getAll();
}
