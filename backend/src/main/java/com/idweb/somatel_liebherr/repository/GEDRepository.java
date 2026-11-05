package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.GED;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface GEDRepository extends JpaRepository<GED, Long>, JpaSpecificationExecutor<GED> {
    List<GED> findByArticleId(Long articleId);
}
