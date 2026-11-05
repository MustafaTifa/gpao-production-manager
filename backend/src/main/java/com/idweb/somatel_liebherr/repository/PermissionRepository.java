package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByRoute(String route);
}
