package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Gamme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface GammeInterface {

    Gamme addGamme(Gamme gamme);

    Page<Gamme> getAllGammes(Specification<Gamme> specification, Pageable pageable);

    Optional<Gamme> getGammeById(Long id);

    Gamme updateGamme(Gamme gamme);

    boolean deleteGamme(Long id);

    List<Gamme> getAllGammesArticle(Long articleId);
}
