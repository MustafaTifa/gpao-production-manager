package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.CFI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CFIRepository extends JpaRepository<CFI,Long>, JpaSpecificationExecutor<CFI> {
}
