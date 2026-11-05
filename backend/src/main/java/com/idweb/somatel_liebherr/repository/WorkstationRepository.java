package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Workstation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WorkstationRepository extends JpaRepository<Workstation, Long>, JpaSpecificationExecutor<Workstation> {
}
