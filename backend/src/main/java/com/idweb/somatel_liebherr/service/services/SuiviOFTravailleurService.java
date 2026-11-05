package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.SuiviOFTravailleur;
import com.idweb.somatel_liebherr.repository.SuiviOFTravailleurRepository;
import com.idweb.somatel_liebherr.service.interfaces.SuiviOFTravailleurInterface;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuiviOFTravailleurService implements SuiviOFTravailleurInterface {

    private final SuiviOFTravailleurRepository repository;

    public SuiviOFTravailleurService(SuiviOFTravailleurRepository repository) {
        this.repository = repository;
    }

    @Override
    public SuiviOFTravailleur add(SuiviOFTravailleur suiviOFTravailleur) {
        try {
            return repository.save(suiviOFTravailleur);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

    @Override
    public List<SuiviOFTravailleur> getAllBySuiviOfId(Long suiviOfId) {
        try {
            return repository.findAllBySuiviOfId(suiviOfId);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

    @Override
    public List<SuiviOFTravailleur> getAllByTravailleurId(Long travailleurId) {
        try {
            return repository.findAllByTravailleurId(travailleurId);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

    @Override
    public Optional<SuiviOFTravailleur> getById(Long id) {
        try {
            return repository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

    @Override
    public SuiviOFTravailleur update(SuiviOFTravailleur suiviOFTravailleur) {
        return repository.findById(suiviOFTravailleur.getId()).map(entity -> {
            if (suiviOFTravailleur.getTravailleur() != null) {
                entity.setTravailleur(suiviOFTravailleur.getTravailleur());
            }
            entity.setQuantite(suiviOFTravailleur.getQuantite());
            entity.setTempEffectif(suiviOFTravailleur.getTempEffectif());
            return repository.save(entity);
        }).orElseThrow(() -> new DatabaseException("SuiviOFTravailleur not found"));
    }

    @Override
    public boolean delete(Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }
}
