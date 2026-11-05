package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.DTOs.ArticleHistoryDTO;
import com.idweb.somatel_liebherr.model.Nomenclature;
import com.idweb.somatel_liebherr.repository.ArticleHistoryRepository;
import com.idweb.somatel_liebherr.repository.ArticleRepository;
import com.idweb.somatel_liebherr.repository.NomenclatureRepository;
import com.idweb.somatel_liebherr.service.interfaces.ArticleInterface;
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
public class ArticleService implements ArticleInterface {

    private final ArticleRepository articleRepository;
    private final ArticleHistoryRepository articleHistoryRepository;
    private final NomenclatureRepository nomenclatureRepository;
    private final PaginationAndFilterService criteriaRepository;

    public ArticleService(ArticleRepository articleRepository, ArticleHistoryRepository articleHistoryRepository, NomenclatureRepository nomenclatureRepository, PaginationAndFilterService criteriaRepository) {
        this.articleRepository = articleRepository;
        this.articleHistoryRepository = articleHistoryRepository;
        this.nomenclatureRepository = nomenclatureRepository;
        this.criteriaRepository = criteriaRepository;
    }

    @Override
    @Transactional
    public Article addArticle(Article article) {
        try {
            Article article1 = articleRepository.save(article);
            Nomenclature nomenclature = new Nomenclature();
            nomenclature.setArticle(article1);
            nomenclatureRepository.save(nomenclature);
            return article1;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Article> getAllArticles(Specification<Article> specification, Pageable pageable) {
        try {
            return articleRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Article> getArticleById(Long id) {
        try {
            return articleRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Article updateArticle(Article article) {

        return articleRepository.findById(article.getId()).map(g -> {
            g.setIdentifiant(article.getIdentifiant());
            g.setIdentifiantSomatel(article.getIdentifiantSomatel());
            g.setLibelleFR(article.getLibelleFR());
            g.setLibelleEN(article.getLibelleEN());
            g.setLibelleGER(article.getLibelleGER());
            g.setFournisseurREF(article.getFournisseurREF());
            g.setObservation(article.getObservation());
            g.setNumberDessin(article.getNumberDessin());
            g.setNature(article.getNature());
            g.setSortieUnit(article.getSortieUnit());
            g.setVersion(g.getVersion()+1);
            g.setType(article.getType());
            g.setGroupe(article.getGroupe());
            g.setSousGroupe(article.getSousGroupe());
            g.setEngins(article.getEngins());
            g.setFacteurTaux(article.getFacteurTaux());
            return articleRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Article not found"));
    }

    @Override
    public boolean deleteArticle(Long id) {
        try {
            articleRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<Article> getChlidArticles(Long articleId) {
        List<Article> listOfChildArticles = articleRepository.getChildArticlesOfNomenclature(articleId);
        return listOfChildArticles;
    }

    @Override
    public List<ArticleHistoryDTO> getHistoryArticles(Long articleId) {
        List<ArticleHistoryDTO> listOfArticles = articleHistoryRepository.getHistoryArticles(articleId);
        return listOfArticles;
    }
}
