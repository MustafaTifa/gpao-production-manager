package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOFExtern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SuiviOFExternInterface {

    SuiviOFExtern addSuiviOF(SuiviOFExtern SuiviOFExtern);

    Page<SuiviOFExtern> getAllSuiviOFs(Specification<SuiviOFExtern> specification, Pageable pageable);

    Optional<SuiviOFExtern> getSuiviOFById(Long id);

    SuiviOFExtern updateSuiviOF(SuiviOFExtern SuiviOFExtern);

    boolean deleteSuiviOF(Long id);
}
