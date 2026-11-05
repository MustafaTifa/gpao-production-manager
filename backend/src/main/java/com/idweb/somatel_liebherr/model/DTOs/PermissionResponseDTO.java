package com.idweb.somatel_liebherr.model.DTOs;

public class PermissionResponseDTO {

    private Long id;
    private String name;
    private String route;
    private String icon;
    private String description;

    public PermissionResponseDTO() {}

    public PermissionResponseDTO(Long id, String name, String route, String icon, String description) {
        this.id = id;
        this.name = name;
        this.route = route;
        this.icon = icon;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
