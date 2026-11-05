package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.OFIntern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface OFInternRepository extends JpaRepository<OFIntern, Long>, JpaSpecificationExecutor<OFIntern> {
    Optional<OFIntern> findByNumberOF(String numberOF);
}
