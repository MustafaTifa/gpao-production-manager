package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.DTOs.ArticleHistoryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article,Long>, JpaSpecificationExecutor<Article> {

    @Query(value="select  a.* from (select * from public.nomenclature where article_id = :articleId) as n\n" +
            "            join public.article_nomenclature as an on n.id = an.nomenclature_id \n" +
            "            join public.article as a on a.id = an.article_id ", nativeQuery = true)
    List<Article> getChildArticlesOfNomenclature(@Param("articleId") Long articleId);

}
