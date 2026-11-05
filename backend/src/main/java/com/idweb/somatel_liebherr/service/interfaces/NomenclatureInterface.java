package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.ArticleNomenclature;
import com.idweb.somatel_liebherr.model.Nomenclature;

import java.util.List;
import java.util.Optional;

public interface NomenclatureInterface {

    ArticleNomenclature addArticleNomenclature(ArticleNomenclature articleNomenclature);
    // we create nomenclature just after the creation of article so here we add articleNomenclature on association class ArticleNomenclature

    Nomenclature getNomenclatureByArticleId(Long articleId);

    List<ArticleNomenclature> getAllArticleNomenclaturesUsingIds(List<Long> ids);

    List<ArticleNomenclature> getAllArticleNomenclatures(Long id);

    ArticleNomenclature updateArticleNomenclature(ArticleNomenclature nomenclature);

    boolean deleteArticleNomenclature(Long id);
}
