package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.ArticleNomenclature;
import com.idweb.somatel_liebherr.model.Nomenclature;
import com.idweb.somatel_liebherr.repository.ArticleNomenclatureRepository;
import com.idweb.somatel_liebherr.repository.ArticleRepository;
import com.idweb.somatel_liebherr.repository.NomenclatureRepository;
import com.idweb.somatel_liebherr.service.interfaces.NomenclatureInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class NomenclatureService implements NomenclatureInterface {

    private final NomenclatureRepository nomenclatureRepository;
    private final ArticleNomenclatureRepository articleNomenclatureRepository;
    private final ArticleService articleService;

    public NomenclatureService(NomenclatureRepository nomenclatureRepository, ArticleRepository articleRepository, ArticleNomenclatureRepository articleNomenclatureRepository, PaginationAndFilterService filterService, ArticleService articleService) {
        this.nomenclatureRepository = nomenclatureRepository;
        this.articleNomenclatureRepository = articleNomenclatureRepository;
        this.articleService = articleService;
    }

    @Override
    public ArticleNomenclature addArticleNomenclature(ArticleNomenclature articleNomenclature) {
        try {
            Article existingArticle = articleService.getArticleById(articleNomenclature.getArticle().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + articleNomenclature.getArticle().getId()));
            Nomenclature nomenclature = nomenclatureRepository.findById(articleNomenclature.getNomenclature().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Nomenclature not found with ID: " + articleNomenclature.getNomenclature().getId()));
            return articleNomenclatureRepository.save(articleNomenclature);
//            for (Article article : nomenclature.getArticles()) {
//                // Load the actual article from the database
//                Article existingArticle = articleRepository.findById(article.getId())
//                        .orElseThrow(() -> new EntityNotFoundException("Article not found with ID: " + article.getId()));
//
//                // Create a new ArticleNomenclature instance and set the properties
//                ArticleNomenclature articleNomenclature = new ArticleNomenclature();
//                articleNomenclature.setNomenclature(nomenclature);
//                articleNomenclature.setArticle(existingArticle);
//                articleNomenclature.setType(article.getTypeArticle()); // Use the provided type for each article
//
//                // Add the ArticleNomenclature to both the nomenclature and the article
//                nomenclature.getArticleNomenclatures().add(articleNomenclature);
//                existingArticle.getArticleNomenclatures().add(articleNomenclature);
//            }
//
//            // Save the Nomenclature along with associated ArticleNomenclature records
//            return nomenclatureRepository.save(nomenclature);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
        public Nomenclature getNomenclatureByArticleId(Long articleId){
        try {
            return nomenclatureRepository.findByArticleId(articleId);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<ArticleNomenclature> getAllArticleNomenclatures(Long id) {
        try {
            Nomenclature nomenclature = nomenclatureRepository.findByArticleId(id);
            if(nomenclature == null){
                return null;
            }
            return articleNomenclatureRepository.findByNomenclatureId(nomenclature.getId());
//            List<Article> articles = new ArrayList<>();
//            return results.stream()
//                    .map(obj -> {
//                        articles.add(new Article((Short) obj[6], ((Long) obj[9]).longValue(), (String) obj[7], (String) obj[8]));
//                        Date LastModifiedDate = obj[2] != null  ? (Date) obj[2] : null;
//                        return new Nomenclature(
//                                ((Long) obj[0]).longValue(), // nomenclatureId
//                                (Date) obj[1],  // date de creation
//                                LastModifiedDate,  // date de modification
//                                (String) obj[3],  // observation
//                                (Integer) obj[4],  // quantity
//                                (Integer) obj[5],  // version
//                                articles);
//
//                    }).collect(Collectors.toList()).get(0);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public List<ArticleNomenclature> getAllArticleNomenclaturesUsingIds(List<Long> ids) {
        try {
            List<Nomenclature> nomenclatures = nomenclatureRepository.findByArticleIdIn(ids);
            if(nomenclatures.isEmpty()){
                return null;
            }
            return articleNomenclatureRepository.findByNomenclatureIdIn(nomenclatures.stream()
                    .map(Nomenclature::getId)
                    .collect(Collectors.toList()));
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public ArticleNomenclature updateArticleNomenclature(ArticleNomenclature ar) {
        try {
            ArticleNomenclature articleNomenclatureObject = articleNomenclatureRepository.findById(ar.getId())
                    .orElseThrow(() -> new DatabaseException("Nomenclature not found"));

            articleNomenclatureObject.setArticle(ar.getArticle());
            articleNomenclatureObject.setNomenclature(ar.getNomenclature());
            articleNomenclatureObject.setObservation(ar.getObservation());
            articleNomenclatureObject.setQuantity(ar.getQuantity());

            return articleNomenclatureRepository.save(articleNomenclatureObject);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public boolean deleteArticleNomenclature(Long id) {
        try {
            articleNomenclatureRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
