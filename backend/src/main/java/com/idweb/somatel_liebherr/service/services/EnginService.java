package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Engin;
import com.idweb.somatel_liebherr.repository.EnginRepository;
import com.idweb.somatel_liebherr.service.interfaces.EnginInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnginService implements EnginInterface {

    private final EnginRepository EnginRepository;
    private final PaginationAndFilterService enginCrateriaRepository;

    public EnginService(EnginRepository EnginRepository, PaginationAndFilterService enginCrateriaRepository) {
        this.EnginRepository = EnginRepository;
        this.enginCrateriaRepository = enginCrateriaRepository;
    }

    @Override
    public Engin addEngin(Engin Engin) {
        try {
            return EnginRepository.save(Engin);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Engin> getAllEngins(Specification<Engin> specification, Pageable pageable) {
        try {
            return EnginRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Engin> getEnginById(Long id) {
        try {
            return EnginRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Engin updateEngin(Engin Engin) {

        return EnginRepository.findById(Engin.getId()).map(g -> {
            g.setLibelle(Engin.getLibelle());
            g.setObservation(Engin.getObservation());
            g.setCodeEngin(Engin.getCodeEngin());
            return EnginRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Engins not found"));
    }

    @Override
    public boolean deleteEngin(Long id) {
        try {
            EnginRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
