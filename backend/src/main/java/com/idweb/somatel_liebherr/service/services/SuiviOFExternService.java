package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOFExtern;
import com.idweb.somatel_liebherr.repository.NomenclatureOFRepository;
import com.idweb.somatel_liebherr.repository.NomenclatureRepository;
import com.idweb.somatel_liebherr.repository.SuiviOFExterneRepository;
import com.idweb.somatel_liebherr.repository.SuiviOFRepository;
import com.idweb.somatel_liebherr.service.interfaces.SuiviOFExternInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SuiviOFExternService implements SuiviOFExternInterface {

    private final SuiviOFExterneRepository suiviOFRepository;
    private final PaginationAndFilterService criteriaRepository;

    public SuiviOFExternService(SuiviOFExterneRepository suiviOFRepository, NomenclatureRepository nomenclatureRepository, NomenclatureOFRepository nomenclatureOFRepository, PaginationAndFilterService criteriaRepository) {
        this.suiviOFRepository = suiviOFRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    @Transactional
    public SuiviOFExtern addSuiviOF(SuiviOFExtern suiviOF) {
        try {
            return suiviOFRepository.save(suiviOF);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<SuiviOFExtern> getAllSuiviOFs(Specification<SuiviOFExtern> specification, Pageable pageable) {
        try {
            return suiviOFRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<SuiviOFExtern> getSuiviOFById(Long id) {
        try {
            return suiviOFRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public SuiviOFExtern updateSuiviOF(SuiviOFExtern suiviOF) {

        return suiviOFRepository.findById(suiviOF.getId()).map(of -> {
//            of.setNumberOF(suiviOF.getNumberOF());
//            of.setDate(suiviOF.getDate());
//            of.setQuantity(suiviOF.getQuantity());
//            of.setDelai(suiviOF.getDelai());
//            of.setBonDeCommande((suiviOF.getBonDeCommande()));
//            of.setObservation(suiviOF.getObservation());
//            of.setArticle(suiviOF.getArticle());

            return suiviOFRepository.save(suiviOF);
        }).orElseThrow(() -> new DatabaseException("SuiviOFExtern not found"));
    }

    @Override
    public boolean deleteSuiviOF(Long id) {
        try {
            suiviOFRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
