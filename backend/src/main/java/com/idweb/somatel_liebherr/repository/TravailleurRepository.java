package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Travailleur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TravailleurRepository extends JpaRepository<Travailleur, Long>, JpaSpecificationExecutor<Travailleur> {
}
