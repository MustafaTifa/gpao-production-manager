package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GroupRepository extends JpaRepository<Groupe, Long>, JpaSpecificationExecutor<Groupe> {
}
