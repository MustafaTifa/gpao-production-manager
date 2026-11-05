package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Travailleur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface TravailleurInterface {

    Travailleur addTravailleur(Travailleur Travailleur);

    Page<Travailleur> getAllTravailleurs(Specification<Travailleur> specification, Pageable pageable);

    Optional<Travailleur> getTravailleurById(Long id);

    Travailleur updateTravailleur(Travailleur Travailleur);

    boolean deleteTravailleur(Long id);
}
