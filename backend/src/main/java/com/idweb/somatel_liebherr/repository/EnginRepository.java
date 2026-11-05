package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Engin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EnginRepository extends JpaRepository<Engin, Long>, JpaSpecificationExecutor<Engin> {
}
