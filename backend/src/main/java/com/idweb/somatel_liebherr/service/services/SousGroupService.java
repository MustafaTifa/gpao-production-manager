package com.idweb.somatel_liebherr.service.services;


import com.idweb.somatel_liebherr.model.SousGroupe;
import com.idweb.somatel_liebherr.repository.SousGroupRepository;
import com.idweb.somatel_liebherr.service.interfaces.SousGroupInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class SousGroupService implements SousGroupInterface {

    private final SousGroupRepository sousGroupRepository;
    private final PaginationAndFilterService criteriaRepository;

    public SousGroupService(SousGroupRepository sousGroupRepository, PaginationAndFilterService criteriaRepository) {
        this.sousGroupRepository = sousGroupRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    public SousGroupe addSousGroup(SousGroupe sousGroupe) {
        try {
            return sousGroupRepository.save(sousGroupe);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<SousGroupe> getAllSousGroups(Specification<SousGroupe> specification, Pageable pageable) {
        try {
            return sousGroupRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<SousGroupe> getSousGroupById(Long id) {
        try {
            return sousGroupRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public SousGroupe updateSousGroup(SousGroupe sousGroupe) {

        return sousGroupRepository.findById(sousGroupe.getId()).map(g -> {
            g.setLibelle(sousGroupe.getLibelle());
            g.setObservation(sousGroupe.getObservation());
            g.setCodeSousGroup(sousGroupe.getCodeSousGroup());
            g.setGroupe(sousGroupe.getGroupe());
            return sousGroupRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Sous-group not found"));
    }

    @Override
    public boolean deleteSousGroup(Long id) {
        try {
            sousGroupRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
