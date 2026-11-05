package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.DTOs.TravailleurWorkDTO;
import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOF;
import com.idweb.somatel_liebherr.model.SuiviOFTravailleur;
import com.idweb.somatel_liebherr.repository.NomenclatureOFRepository;
import com.idweb.somatel_liebherr.repository.NomenclatureRepository;
import com.idweb.somatel_liebherr.repository.SuiviOFRepository;
import com.idweb.somatel_liebherr.repository.SuiviOFTravailleurRepository;
import com.idweb.somatel_liebherr.service.interfaces.SuiviOFInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SuiviOFService implements SuiviOFInterface {


    private final SuiviOFRepository suiviOFRepository;
    private final NomenclatureOFRepository nomenclatureOFRepository;
    private final SuiviOFTravailleurRepository suiviOFTravailleurRepository;
    private final PaginationAndFilterService criteriaRepository;

    public SuiviOFService(SuiviOFRepository suiviOFRepository, NomenclatureRepository nomenclatureRepository, NomenclatureOFRepository nomenclatureOFRepository, SuiviOFTravailleurRepository suiviOFTravailleurRepository, PaginationAndFilterService criteriaRepository) {
        this.suiviOFRepository = suiviOFRepository;
        this.nomenclatureOFRepository = nomenclatureOFRepository;
        this.suiviOFTravailleurRepository = suiviOFTravailleurRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    @Transactional
    public SuiviOF addSuiviOF(SuiviOF suiviOF) {
        try {
            List<SuiviOFTravailleur> travailleurs = suiviOF.getTravailleurs();
            SuiviOF saved = suiviOFRepository.save(suiviOF);
            if (travailleurs != null && !travailleurs.isEmpty()) {
                for (SuiviOFTravailleur t : travailleurs) {
                    t.setSuiviOf(saved);
                }
                suiviOFTravailleurRepository.saveAll(travailleurs);
            }
            return saved;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Transactional
    @Override
    public NomenclatureOF addNomenclatureOF(NomenclatureOF nomenclatureOF) {
        try {
            return nomenclatureOFRepository.save(nomenclatureOF);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<SuiviOF> getAllSuiviOFs(Long idOF, Specification<SuiviOF> specification, Pageable pageable) {
        try {
            List<SuiviOF> suiviOFS = suiviOFRepository.findAllByOFID(idOF);
            suiviOFS.forEach(s -> s.setTravailleurs(suiviOFTravailleurRepository.findAllBySuiviOfId(s.getId())));
            return suiviOFS;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<NomenclatureOF> getAllNomenclatureOF(Long idOF) {
        try {
            return nomenclatureOFRepository.findAllByOFID(idOF);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<SuiviOF> getSuiviOFById(Long id) {
        try {
            return suiviOFRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    @Transactional
    public SuiviOF updateSuiviOF(SuiviOF suiviOF) {
        return suiviOFRepository.findById(suiviOF.getId()).map(of -> {
            SuiviOF saved = suiviOFRepository.save(suiviOF);
            List<SuiviOFTravailleur> travailleurs = suiviOF.getTravailleurs();
            if (travailleurs != null) {
                suiviOFTravailleurRepository.deleteAllBySuiviOfId(saved.getId());
                for (SuiviOFTravailleur t : travailleurs) {
                    t.setId(null);
                    t.setSuiviOf(saved);
                }
                suiviOFTravailleurRepository.saveAll(travailleurs);
            }
            return saved;
        }).orElseThrow(() -> new DatabaseException("SuiviOF not found"));
    }

    @Override
    public NomenclatureOF updateNomenclatureOF(NomenclatureOF nomenclatureOF) {

        return nomenclatureOFRepository.findById(nomenclatureOF.getId()).map(nomOf -> {
              nomOf.setQuantity(nomenclatureOF.getQuantity());
//            of.setDate(suiviOF.getDate());
//            of.setQuantity(suiviOF.getQuantity());
//            of.setDelai(suiviOF.getDelai());
//            of.setBonDeCommande((suiviOF.getBonDeCommande()));
//            of.setObservation(suiviOF.getObservation());
//            of.setArticle(suiviOF.getArticle());

            return nomenclatureOFRepository.save(nomOf);
        }).orElseThrow(() -> new DatabaseException("SuiviOF not found"));
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

    @Override
    public List<TravailleurWorkDTO> getWorkByTravailleur(LocalDateTime startDate, LocalDateTime endDate, Long workstationId) {
        try {
            List<Object[]> results;
            if (workstationId != null) {
                results = suiviOFRepository.getWorkByTravailleurAndWorkstation(startDate, endDate, workstationId);
            } else {
                results = suiviOFRepository.getWorkByTravailleur(startDate, endDate);
            }
            return results.stream()
                    .map(row -> new TravailleurWorkDTO(
                            (String) row[0],
                            (String) row[1],
                            ((Number) row[2]).longValue(),
                            (String) row[3],
                            (String) row[4],
                            ((Number) row[5]).longValue()
                    ))
                    .toList();
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

}
