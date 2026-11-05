package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.GED;
import com.idweb.somatel_liebherr.repository.GEDRepository;
import com.idweb.somatel_liebherr.service.interfaces.GEDInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GEDService implements GEDInterface {

    private final GEDRepository gedRepository;
    private final PaginationAndFilterService criteriaRepository;

    public GEDService(GEDRepository gedRepository, PaginationAndFilterService criteriaRepository) {
        this.gedRepository = gedRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    public GED addGED(GED ged) {
        try {

            return gedRepository.save(ged);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<GED> getAllGEDs(Long articleId) {
        try {
            return gedRepository.findByArticleId(articleId);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<GED> getGEDById(Long id) {
        try {
            return gedRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public GED updateGED(GED ged) {

        return gedRepository.findById(ged.getId()).map(g -> {
            g.setLibelle(ged.getLibelle());
            g.setObservation(ged.getObservation());
            g.setFileName(ged.getFileName());
            g.setVersion(g.getVersion()+1);
            return gedRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("GED not found"));
    }

    @Override
    public boolean deleteGED(Long id) {
        try {
            gedRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
