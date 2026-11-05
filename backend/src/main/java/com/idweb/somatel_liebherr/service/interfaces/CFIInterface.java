package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.CFI;
import com.idweb.somatel_liebherr.model.Groupe;
import com.idweb.somatel_liebherr.model.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface CFIInterface {

    CFI addCFI(CFI cfi);

    Page<CFI> getAllCFIs(Specification<CFI> specification, Pageable pageable);

    Optional<CFI> getCFIById(Long id);

    CFI updateCFI(CFI cfi);

    boolean deleteCFI(Long id);
}
