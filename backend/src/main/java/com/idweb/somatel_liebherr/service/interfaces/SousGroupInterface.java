package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.SousGroupe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface SousGroupInterface {

    SousGroupe addSousGroup(SousGroupe SousGroupe);

    Page<SousGroupe> getAllSousGroups(Specification<SousGroupe> specification, Pageable pageable);

    Optional<SousGroupe> getSousGroupById(Long id);

    SousGroupe updateSousGroup(SousGroupe SousGroupe);

    boolean deleteSousGroup(Long id);
}
