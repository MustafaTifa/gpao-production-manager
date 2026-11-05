package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.SuiviOFTravailleur;

import java.util.List;
import java.util.Optional;

public interface SuiviOFTravailleurInterface {

    SuiviOFTravailleur add(SuiviOFTravailleur suiviOFTravailleur);

    List<SuiviOFTravailleur> getAllBySuiviOfId(Long suiviOfId);

    List<SuiviOFTravailleur> getAllByTravailleurId(Long travailleurId);

    Optional<SuiviOFTravailleur> getById(Long id);

    SuiviOFTravailleur update(SuiviOFTravailleur suiviOFTravailleur);

    boolean delete(Long id);
}
