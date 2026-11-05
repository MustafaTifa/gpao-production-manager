package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.SousGroupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SousGroupRepository extends JpaRepository<SousGroupe ,Long>, JpaSpecificationExecutor<SousGroupe> {
}
