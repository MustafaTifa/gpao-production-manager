package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.SuiviOFExtern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SuiviOFExterneRepository extends JpaRepository<SuiviOFExtern, Long>, JpaSpecificationExecutor<SuiviOFExtern> {
}
