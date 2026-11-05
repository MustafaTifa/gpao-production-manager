package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.DTOs.TravailleurWorkDTO;
import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOF;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SuiviOFInterface {

    SuiviOF addSuiviOF(SuiviOF SuiviOF);

    @Transactional
    NomenclatureOF addNomenclatureOF(NomenclatureOF nomenclatureOF);

    List<SuiviOF> getAllSuiviOFs(Long idOF, Specification<SuiviOF> specification, Pageable pageable);

    List<NomenclatureOF> getAllNomenclatureOF(Long idOF);

    Optional<SuiviOF> getSuiviOFById(Long id);

    SuiviOF updateSuiviOF(SuiviOF SuiviOF);

    NomenclatureOF updateNomenclatureOF(NomenclatureOF nomenclatureOF);

    boolean deleteSuiviOF(Long id);

    List<TravailleurWorkDTO> getWorkByTravailleur(LocalDateTime startDate, LocalDateTime endDate, Long workstationId);
}
