package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String route;

    @Column
    private String icon;

    @Column
    private String description;

    public Permission() {}

    public Permission(String name, String route, String icon, String description) {
        this.name = name;
        this.route = route;
        this.icon = icon;
        this.description = description;
    }
}
