package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.OFExtern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface OFExternInterface {
    OFExtern addOFExtern(OFExtern OFExtern);

    Page<OFExtern> getAllOFExterns(Specification<OFExtern> specification, Pageable pageable);

    Optional<OFExtern> getOFExternById(String id);


    OFExtern updateOFExtern(OFExtern OFExtern);

    boolean deleteOFExtern(Long id);
}
