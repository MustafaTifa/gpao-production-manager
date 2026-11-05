package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.ArticleOFExtern;
import com.idweb.somatel_liebherr.model.DetailOFExtern;
import com.idweb.somatel_liebherr.repository.DetailOFExternRepository;
import com.idweb.somatel_liebherr.repository.OFExternArticleRepository;
import com.idweb.somatel_liebherr.service.interfaces.OFExternArticleInterface;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OFExternArticleService implements OFExternArticleInterface {
    private final OFExternArticleRepository ofExternArticleRepository;
    private final DetailOFExternRepository ofExternRepository;

    public OFExternArticleService(OFExternArticleRepository ofExternArticleRepository, DetailOFExternRepository ofExternRepository) {
        this.ofExternArticleRepository = ofExternArticleRepository;
        this.ofExternRepository = ofExternRepository;
    }

    @Override
    public ArticleOFExtern addArticleOFExtern(ArticleOFExtern articleOFExtern) {
        try {
            if (articleOFExtern.getDetails() != null) {
                articleOFExtern.setDetails(articleOFExtern.getDetails()); // this also links the parent
            }

            return ofExternArticleRepository.save(articleOFExtern); // ✅ only this — let cascade do the rest
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(), e);
        }
    }

    @Override
    public Page<ArticleOFExtern> getAllArticleOFExtern(Specification<ArticleOFExtern> specification, Pageable pageable) {
        try {
            return ofExternArticleRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<ArticleOFExtern> getArticleOFExternById(Long ofExternId, Pageable pageable) {
        try {
            return ofExternArticleRepository.findByofExtern_Id(ofExternId,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public ArticleOFExtern updateArticleOFExtern(ArticleOFExtern articleOFExtern) {
        return ofExternArticleRepository.findById(articleOFExtern.getId()).map(of -> {
            of.setArticle(articleOFExtern.getArticle());
            of.setOfExtern(articleOFExtern.getOfExtern());
            of.setQuantity(articleOFExtern.getQuantity());

            return ofExternArticleRepository.save(of);
        }).orElseThrow(() -> new DatabaseException("OF Extern not found"));
    }

    @Override
    public boolean deleteArticleOFExtern(Long id) {
        try {
            ofExternArticleRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
