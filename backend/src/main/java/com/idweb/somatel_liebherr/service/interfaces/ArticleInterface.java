package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.DTOs.ArticleHistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface ArticleInterface {
    Article addArticle(Article Article);

    Page<Article> getAllArticles(Specification<Article> specification, Pageable pageable);

    Optional<Article> getArticleById(Long id);

    Article updateArticle(Article Article);

    boolean deleteArticle(Long id);

    List<Article> getChlidArticles(Long nomeenclatureId);

    List<ArticleHistoryDTO> getHistoryArticles(Long articleId);
}
