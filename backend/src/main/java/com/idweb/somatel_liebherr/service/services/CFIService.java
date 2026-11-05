package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.CFI;
import com.idweb.somatel_liebherr.model.Type;
import com.idweb.somatel_liebherr.repository.CFIRepository;
import com.idweb.somatel_liebherr.service.interfaces.CFIInterface;
import com.idweb.somatel_liebherr.service.interfaces.TypeInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CFIService implements CFIInterface {

    private final CFIRepository cfiRepository;
    private final PaginationAndFilterService cfiCriteriaRepository;

    public CFIService(CFIRepository cfiRepository, PaginationAndFilterService cfiCriteriaRepository) {
        this.cfiRepository = cfiRepository;
        this.cfiCriteriaRepository = cfiCriteriaRepository;
    }

    @Override
    public CFI addCFI(CFI cfi) {
        try {
            return cfiRepository.save(cfi);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<CFI> getAllCFIs(Specification<CFI> specification, Pageable pageable) {
        try {
            return cfiRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<CFI> getCFIById(Long id) {
        try {
            return cfiRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public CFI updateCFI(CFI cfi) {

        return cfiRepository.findById(cfi.getId()).map(g -> {
            g.setLibelle(cfi.getLibelle());
            g.setObservation(cfi.getObservation());
            g.setCodeCFI(cfi.getCodeCFI());
            return cfiRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("CFI not found"));
    }

    @Override
    public boolean deleteCFI(Long id) {
        try {
            cfiRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
