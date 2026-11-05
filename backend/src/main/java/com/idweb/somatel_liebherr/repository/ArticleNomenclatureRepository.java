package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.ArticleNomenclature;
import com.idweb.somatel_liebherr.model.Nomenclature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleNomenclatureRepository extends JpaRepository<ArticleNomenclature, Long> {
    List<ArticleNomenclature> findByNomenclatureId(Long articleId);
    List<ArticleNomenclature> findByNomenclatureIdIn(List<Long> articleIds);
}
