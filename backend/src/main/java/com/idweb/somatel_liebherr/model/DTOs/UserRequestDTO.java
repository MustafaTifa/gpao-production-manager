package com.idweb.somatel_liebherr.model.DTOs;

import java.util.List;

public class UserRequestDTO {

    private String username;
    private String password;
    private List<RoleResponseDTO> roles;

    public UserRequestDTO() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<RoleResponseDTO> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleResponseDTO> roles) {
        this.roles = roles;
    }
}
