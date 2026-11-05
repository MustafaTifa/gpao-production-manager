package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.ArticleOFExtern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface OFExternArticleRepository extends JpaRepository<ArticleOFExtern, Long>, JpaSpecificationExecutor<ArticleOFExtern> {
    Page<ArticleOFExtern> findByofExtern_Id(Long ofExternId, Pageable pageable);
}
