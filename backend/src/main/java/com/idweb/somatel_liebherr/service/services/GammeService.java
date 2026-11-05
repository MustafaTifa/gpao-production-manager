package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.*;
import com.idweb.somatel_liebherr.model.Enum.TypeArticle;
import com.idweb.somatel_liebherr.model.Gamme;
import com.idweb.somatel_liebherr.repository.ArticleRepository;
import com.idweb.somatel_liebherr.repository.GammeRepository;
import com.idweb.somatel_liebherr.service.interfaces.GammeInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GammeService implements GammeInterface {
    private final GammeRepository gammeRepository;
    private final ArticleRepository articleRepository;
    private final PaginationAndFilterService filterRepository;

    public GammeService(GammeRepository gammeRepository, ArticleRepository articleRepository, PaginationAndFilterService filterRepository) {
        this.gammeRepository = gammeRepository;
        this.articleRepository = articleRepository;
        this.filterRepository = filterRepository;
    }

    @Override
    public Gamme addGamme(Gamme gamme) {
        try {
            for (Article article : gamme.getArticles()) {
                // Load the actual article from the database
                Article existingArticle = articleRepository.findById(article.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + article.getId()));

                // Create a new ArticleGamme instance and set the properties
                ArticleGamme articleGamme = new ArticleGamme();
                articleGamme.setGamme(gamme);
                articleGamme.setArticle(existingArticle);
                articleGamme.setType(article.getTypeArticle()); // Use the provided type for each article

                // Add the ArticleGamme to both the gamme and the article
                gamme.getArticleGammes().add(articleGamme);
                existingArticle.getArticleGammes().add(articleGamme);
            }

            // Save the Gamme along with associated ArticleGamme records
            return gammeRepository.save(gamme);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Gamme> getAllGammes(Specification<Gamme> specification, Pageable pageable) {
        try {
            return gammeRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Gamme> getGammeById(Long id) {
        try {
            return gammeRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<Gamme> getAllGammesArticle(Long id) {
        try {

            List<Object[]> results =  gammeRepository.findGammeIdOfArticle(id);
            List<Article> articles = new ArrayList<>();
            List<Gamme> listWithoutDuplicates = results.stream()
                    .map(obj -> {
                        articles.add(new Article((Short) obj[7], ((Long) obj[4]).longValue(), (String) obj[5], (String) obj[6], ((Long) obj[0]).longValue()));
                        Workstation workstation = new Workstation(((Long) obj[8]).longValue(),(String) obj[10],(String) obj[9]);
                        Date LastModifiedDate = obj[12] != null  ? (Date) obj[12] : null;
                        return new Gamme(
                                ((Long) obj[0]).longValue(),
                                (String) obj[1],
                                (String) obj[2],
                                ((Long) obj[3]).longValue(),
                                LastModifiedDate,
                                (Integer) obj[11],
                                workstation,
                                articles,
                                (String) obj[13],
                                (String) obj[14],
                                (String) obj[15],
                                obj[16] != null ? ((Number) obj[16]).longValue() : null,
                                (String) obj[17]);

                    }).collect(Collectors.toMap(
                            Gamme::getId, // Key by `id`
                            gamme -> gamme, // Keep the gamme
                            (existing, replacement) -> existing  // Choose the first duplicate
                    ))
                    .values()
                    .stream()
                    .toList();
            listWithoutDuplicates.forEach(gamme -> {
                List<Article> filteredItems = gamme.getArticles().stream()
                        .filter(article -> article.getGammeId() == gamme.getId() && article.getTypeArticle().equals(TypeArticle.CHILD))
                        .collect(Collectors.toList());
                gamme.setArticles(filteredItems); // Set the filtered list back to the order
            });
            return new ArrayList<>(new HashSet<>(listWithoutDuplicates));
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Gamme updateGamme(Gamme gamme) {
        try {
            Gamme gammeObject = gammeRepository.findById(gamme.getId())
                    .orElseThrow(() -> new DatabaseException("Gamme not found"));


            gamme.getArticleGammes().clear();
            gamme.setVersion(gammeObject.getVersion()+1);
            for (Article article : gamme.getArticles()) {
                // Load the actual article from the database
                Article existingArticle = articleRepository.findById(article.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + article.getId()));


                // Create a new ArticleGamme instance and set the properties
                ArticleGamme articleGamme = new ArticleGamme();
                articleGamme.setGamme(gamme);
                articleGamme.setArticle(existingArticle);
                articleGamme.setType(article.getTypeArticle()); // Use the provided type for each article

                // Add the ArticleGamme to both the gamme and the article
                gamme.getArticleGammes().add(articleGamme);
//                existingArticle.getArticleGammes().add(articleGamme);
            }

            return gammeRepository.save(gamme);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public boolean deleteGamme(Long id) {
        try {
            gammeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
