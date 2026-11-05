package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Gamme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GammeRepository extends JpaRepository<Gamme, Long>, JpaSpecificationExecutor<Gamme> {

    @Query(value="select g.id,g.pos,g.operation,g.execution_time,a.id, a.identifiant, a.libellefr,ag.type,w.id, w.code_workstation, w.libelle, g.version,g.last_modified, g.rc, g.observation, g.operation_detail, g.preparation_time, g.gs \n" +
            "from gamme as g\n" +
            "            join article_gamme as ag on g.id = ag.gamme_id\n" +
            "            join (select identifiant,libellefr,id from article ) as a on a.id = ag.article_id\n" +
            "join workstation as w on w.id = g.id_workstation\n" +
            "where g.id in (SELECT gamme_id FROM public.article_gamme where article_id = :articleId and type = 0)", nativeQuery = true)
    List<Object[]> findGammeIdOfArticle(@Param("articleId") Long articleId);
}
