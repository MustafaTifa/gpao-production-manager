package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.ArticleOFExtern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface OFExternArticleInterface {

    ArticleOFExtern addArticleOFExtern(ArticleOFExtern articleOFExtern);

    Page<ArticleOFExtern> getAllArticleOFExtern(Specification<ArticleOFExtern> specification, Pageable pageable);

    Page<ArticleOFExtern> getArticleOFExternById(Long ofExternId, Pageable pageable);

    ArticleOFExtern updateArticleOFExtern(ArticleOFExtern articleOFExtern);

    boolean deleteArticleOFExtern(Long id);
}
