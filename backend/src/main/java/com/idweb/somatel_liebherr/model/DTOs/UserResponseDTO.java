package com.idweb.somatel_liebherr.model.DTOs;

import java.util.List;

public class UserResponseDTO {

    private Long id;
    private String username;
    private List<RoleResponseDTO> roles;

    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String username, List<RoleResponseDTO> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<RoleResponseDTO> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleResponseDTO> roles) {
        this.roles = roles;
    }
}
