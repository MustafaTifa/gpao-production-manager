package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.OFExtern;
import com.idweb.somatel_liebherr.model.OFIntern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface OFExternRepository extends JpaRepository<OFExtern, Long>, JpaSpecificationExecutor<OFExtern> {
    Optional<OFExtern> findByNumberOF(String numberOF);
}
