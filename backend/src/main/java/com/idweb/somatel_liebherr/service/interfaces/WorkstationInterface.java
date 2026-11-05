package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Workstation;
import com.idweb.somatel_liebherr.model.Workstation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface WorkstationInterface {
    Workstation addWorkstation(Workstation groupe);

    Page<Workstation> getAllWorkstations(Specification<Workstation> specification, Pageable pageable);

    Optional<Workstation> getWorkstationById(Long id);

    Workstation updateWorkstation(Workstation workstation);

    boolean deleteWorkstation(Long id);
}
