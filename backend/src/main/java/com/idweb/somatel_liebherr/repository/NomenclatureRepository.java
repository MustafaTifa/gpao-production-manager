package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.GED;
import com.idweb.somatel_liebherr.model.Nomenclature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NomenclatureRepository extends JpaRepository<Nomenclature, Long>, JpaSpecificationExecutor<Nomenclature> {

//    @Query(value="select n.*, an.type, a.identifiant, a.libellefr,a.id from nomenclature as n\n" +
//            "join article_nomenclature as an on n.id = an.nomenclature_id\n" +
//            "join article as a on a.id = an.article_id where n.id = :nomenclatureId", nativeQuery = true)
//    List<Object[]> findByArticleId(@Param("nomenclatureId") Long nomenclatureId);

    Nomenclature findByArticleId(Long articleId);
    List<Nomenclature> findByArticleIdIn(List<Long> articleIds);
}
