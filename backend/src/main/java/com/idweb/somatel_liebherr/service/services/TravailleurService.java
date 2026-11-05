package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Travailleur;
import com.idweb.somatel_liebherr.repository.TravailleurRepository;
import com.idweb.somatel_liebherr.repository.TravailleurRepository;
import com.idweb.somatel_liebherr.service.interfaces.TravailleurInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TravailleurService implements TravailleurInterface {

    private final TravailleurRepository travailleurRepository;
    private final PaginationAndFilterService criteriaRepository;

    public TravailleurService(TravailleurRepository travailleurRepository, PaginationAndFilterService criteriaRepository) {
        this.travailleurRepository = travailleurRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    public Travailleur addTravailleur(Travailleur travailleur) {
        try {
            return travailleurRepository.save(travailleur);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Travailleur> getAllTravailleurs(Specification<Travailleur> specification, Pageable pageable) {
        try {
            return travailleurRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Travailleur> getTravailleurById(Long id) {
        try {
            return travailleurRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Travailleur updateTravailleur(Travailleur travailleur) {

        return travailleurRepository.findById(travailleur.getId()).map(g -> {
            g.setLibelle(travailleur.getLibelle());
            g.setObservation(travailleur.getObservation());
            g.setCodeTravailleur(travailleur.getCodeTravailleur());
            g.setWorkstation(travailleur.getWorkstation());
            return travailleurRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Travailleur not found"));
    }

    @Override
    public boolean deleteTravailleur(Long id) {
        try {
            travailleurRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
