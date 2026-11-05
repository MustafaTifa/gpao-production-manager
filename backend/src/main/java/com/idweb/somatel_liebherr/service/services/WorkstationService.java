package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Workstation;
import com.idweb.somatel_liebherr.repository.WorkstationRepository;
import com.idweb.somatel_liebherr.service.interfaces.WorkstationInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkstationService implements WorkstationInterface {

    private final WorkstationRepository workstationRepository;
    private final PaginationAndFilterService workstationCriteriaRepository;

    public WorkstationService(WorkstationRepository workstationRepository, PaginationAndFilterService workstationCriteriaRepository) {
        this.workstationRepository = workstationRepository;
        this.workstationCriteriaRepository = workstationCriteriaRepository;
    }

    @Override
    public Workstation addWorkstation(Workstation workstation) {
        try {
            return workstationRepository.save(workstation);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Workstation> getAllWorkstations(Specification<Workstation> specification, Pageable pageable) {
        try {
            return workstationRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Workstation> getWorkstationById(Long id) {
        try {
            return workstationRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Workstation updateWorkstation(Workstation workstation) {

        return workstationRepository.findById(workstation.getId()).map(g -> {
            g.setLibelle(workstation.getLibelle());
            g.setObservation(workstation.getObservation());
            g.setCodeWorkstation(workstation.getCodeWorkstation());
            return workstationRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Workstation not found"));
    }

    @Override
    public boolean deleteWorkstation(Long id) {
        try {
            workstationRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
