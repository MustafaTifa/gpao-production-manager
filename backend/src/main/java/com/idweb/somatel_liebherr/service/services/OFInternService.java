package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.*;
import com.idweb.somatel_liebherr.model.DTOs.OFDetailDTO;
import com.idweb.somatel_liebherr.repository.*;
import com.idweb.somatel_liebherr.service.interfaces.OFInternInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OFInternService implements OFInternInterface {

    private final OFInternRepository ofInternRepository;
    private final SuiviOFRepository suiviOFRepository;
    private final NomenclatureOFRepository nomenclatureOFRepository;
    private final NomenclatureService nomenclatureService;
    private final GammeService gammeService;
    private final WorkstationRepository workstationRepository;
    private final SuiviOFTravailleurRepository suiviOFTravailleurRepository;
    private final PaginationAndFilterService criteriaRepository;

    public OFInternService(OFInternRepository ofInternRepository, SuiviOFRepository suiviOFRepository, NomenclatureOFRepository nomenclatureOFRepository, NomenclatureService nomenclatureService, GammeService gammeService, WorkstationRepository workstationRepository, SuiviOFTravailleurRepository suiviOFTravailleurRepository, PaginationAndFilterService criteriaRepository) {
        this.ofInternRepository = ofInternRepository;
        this.suiviOFRepository = suiviOFRepository;
        this.nomenclatureOFRepository = nomenclatureOFRepository;
        this.nomenclatureService = nomenclatureService;
        this.gammeService = gammeService;
        this.workstationRepository = workstationRepository;
        this.suiviOFTravailleurRepository = suiviOFTravailleurRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    @Transactional
    public OFIntern addOFIntern(OFIntern ofIntern) {
        try {
            OFIntern ofIntern1 = ofInternRepository.save(ofIntern);
            List<Object[]> results = suiviOFRepository.getStandardGammeToSave(ofIntern1.getArticle().getId());
            List<ArticleNomenclature> nomenclatureEntity = nomenclatureService.getAllArticleNomenclatures(ofIntern1.getArticle().getId());
            if(results.isEmpty()){
                throw new DatabaseException("Cet Article n'a pas d'opérations ");
            }
            List<NomenclatureOF> nomenclatureOFList = nomenclatureEntity.stream().map(obj -> {
                Article article = new Article();
                article.setId(obj.getArticle().getId());
                article.setLibelleFR(obj.getArticle().getLibelleFR());
                article.setIdentifiant(obj.getArticle().getIdentifiant());
                article.setIdentifiantSomatel(obj.getArticle().getIdentifiantSomatel());
                return new NomenclatureOF(ofIntern1.getId(),obj.getPos(),article);
            }).collect(Collectors.toList());
            List<SuiviOF> suiviOFS = results.stream()
                    .map(obj -> {
                        Long[] workers = (Long[]) obj[4];
                        Long[] articles = (Long[]) obj[5];
                        return new SuiviOF(
                                ofIntern1.getId(),
                                ofIntern1.getArticle().getId(),
                                ((Long) obj[3]).longValue(),
                                Arrays.asList(articles),
                                (String) obj[2],
                                (Long) obj[0],
                                (String) obj[1],
                                (String) obj[6],
                                obj[7] != null ? ((Number) obj[7]).longValue() : null,
                                (String) obj[8],
                                (String) obj[9],
                                (String) obj[10]);

                    }).collect(Collectors.toList());
            if(!suiviOFRepository.saveAll(suiviOFS).isEmpty()){
                if(!nomenclatureOFList.isEmpty()){
                    nomenclatureOFRepository.saveAll(nomenclatureOFList);
                }
                return ofIntern1;
            } else {
                throw new DatabaseException("Erreur dans la création des opérations ");
            }
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<OFIntern> getAllOFInterns(Specification<OFIntern> specification, Pageable pageable) {
        try {
            return ofInternRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<OFIntern> getOFInternById(String id) {
        try {
            return ofInternRepository.findByNumberOF(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public OFIntern updateOFIntern(OFIntern ofIntern) {

        return ofInternRepository.findById(ofIntern.getId()).map(of -> {
            of.setNumberOF(ofIntern.getNumberOF());
            of.setDate(ofIntern.getDate());
            of.setQuantity(ofIntern.getQuantity());
            of.setDelai(ofIntern.getDelai());
            of.setBonDeCommande((ofIntern.getBonDeCommande()));
            of.setObservation(ofIntern.getObservation());
            of.setArticle(ofIntern.getArticle());
            of.setProjectOf(ofIntern.getProjectOf());
            of.setRc(ofIntern.getRc());

            return ofInternRepository.save(of);
        }).orElseThrow(() -> new DatabaseException("OFIntern not found"));
    }

    @Override
    public boolean deleteOFIntern(Long id) {
        try {
            ofInternRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public OFDetailDTO getOFDetail(Long id) {
        try {
            OFIntern of = ofInternRepository.findById(id)
                    .orElseThrow(() -> new DatabaseException("OFIntern not found"));

            Workstation posteDeTravail = null;
            List<SuiviOF> suiviOFS = suiviOFRepository.findAllByOFID(id);
            if (!suiviOFS.isEmpty()) {
                posteDeTravail = workstationRepository.findById(suiviOFS.get(0).getIdWorkstation()).orElse(null);
            }
            suiviOFS.forEach(s -> s.setTravailleurs(suiviOFTravailleurRepository.findAllBySuiviOfId(s.getId())));

            return new OFDetailDTO(of, posteDeTravail, suiviOFS);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

}
