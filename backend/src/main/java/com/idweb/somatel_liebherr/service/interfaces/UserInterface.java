package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.DTOs.AssignRolesRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserRequestDTO;
import com.idweb.somatel_liebherr.model.DTOs.UserResponseDTO;

import java.util.List;

public interface UserInterface {
    List<UserResponseDTO> getAll();
    UserResponseDTO createUser(UserRequestDTO request);
    UserResponseDTO updateUser(Long id, UserRequestDTO request);
    void deleteUser(Long id);
    void assignRoles(AssignRolesRequestDTO request);
}
