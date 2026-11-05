package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.DTOs.ArticleHistoryDTO;
import com.idweb.somatel_liebherr.service.services.ArticleService;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/article")
@Tag(name = "Article Management", description = "Operations related to article management")
public class ArticleController {

    private final ArticleService articleService;
    private final PaginationAndFilterService paginationAndFilterService;

    public ArticleController(ArticleService articleService, PaginationAndFilterService filterService) {
        this.articleService = articleService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<Article> addArticle(@RequestBody Article article){
        Article articleEntity = articleService.addArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(articleEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Article>> getAllArticles(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<Article> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Article> ArticleesEntity = articleService.getAllArticles(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(ArticleesEntity.getTotalElements()));
        return new ResponseEntity<>(ArticleesEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id){
        Optional<Article> ArticleeEntity = articleService.getArticleById(id);
        return ArticleeEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/child/{id}")
    public ResponseEntity<List<Article>> getChildArticles(@PathVariable Long id){
        List<Article> ArticlesEntity = articleService.getChlidArticles(id);
        return new ResponseEntity<>(ArticlesEntity, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Article> updateArticle(@RequestBody Article article){
        Article ArticleEntity = articleService.updateArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(ArticleEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id){
        boolean result = articleService.deleteArticle(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/history/{id}")
    public ResponseEntity<List<ArticleHistoryDTO>> getAllArticlesHistory(
            @PathVariable Long id
    ){
        List<ArticleHistoryDTO> ArticlesEntity = articleService.getHistoryArticles(id);
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(ArticleesEntity.getTotalElements()));
        return new ResponseEntity<>(ArticlesEntity, HttpStatus.OK);
    }
}
