package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.DTOs.ArticleHistoryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleHistoryRepository extends JpaRepository<ArticleHistoryDTO, Long> {
    @Query(value="SELECT id, article_id, create_date, fournisseurref, identifiant, identifiant_somatel, last_modified,\n" +
            "libelleen, libellefr, libelleger, nature, sortie_unit, number_dessin, observation,\n" +
            "version, id_group, id_sousgroup, id_type, operation\n" +
            "FROM public.article_historique\n" +
            "where article_id = :articleId", nativeQuery = true)
    List<ArticleHistoryDTO> getHistoryArticles(@Param("articleId") Long articleId);
}
