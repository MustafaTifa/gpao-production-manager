package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.ArticleOFExtern;
import com.idweb.somatel_liebherr.model.OFExtern;
import com.idweb.somatel_liebherr.service.services.OFExternArticleService;
import com.idweb.somatel_liebherr.service.services.OFExternService;
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
@RequestMapping("/api/v1/of_extern")
@Tag(name = "OF Extern Management", description = "Operations related to OF Extern management")
public class OFExternController {
    private final OFExternService ofExternService;
    private final OFExternArticleService ofExternArticleService;
    private final PaginationAndFilterService paginationAndFilterService;

    public OFExternController(OFExternService ofExternService, OFExternArticleService ofExternArticleService, PaginationAndFilterService filterService) {
        this.ofExternService = ofExternService;
        this.ofExternArticleService = ofExternArticleService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<OFExtern> addOFExtern(@RequestBody OFExtern of){
        OFExtern ofEntity = ofExternService.addOFExtern(of);
        return ResponseEntity.status(HttpStatus.CREATED).body(ofEntity);
    }

    @GetMapping()
    public ResponseEntity<List<OFExtern>> getAllOFExterns(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<OFExtern> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<OFExtern> ofEntity = ofExternService.getAllOFExterns(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(ofEntity.getTotalElements()));
        return new ResponseEntity<>(ofEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OFExtern> getOFExternById(@PathVariable String id){
        Optional<OFExtern> ofEntity = ofExternService.getOFExternById(id);
        return ofEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<OFExtern> updateOFExtern(@RequestBody OFExtern of){
        OFExtern ofEntity = ofExternService.updateOFExtern(of);
        return ResponseEntity.status(HttpStatus.CREATED).body(ofEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOFExtern(@PathVariable Long id){
        boolean result = ofExternService.deleteOFExtern(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/pieces-unitaire")
    public ResponseEntity<ArticleOFExtern> addOFExternArticle(@RequestBody ArticleOFExtern of){
        System.out.println("Incoming ArticleOFExtern: " + of.getQuantity());
        System.out.println("Details count: " + (of.getDetails() != null ? of.getDetails().size() : 0));

        ArticleOFExtern ofEntity = ofExternArticleService.addArticleOFExtern(of);
        return ResponseEntity.status(HttpStatus.CREATED).body(ofEntity);
    }

    @GetMapping("/pieces-unitaire")
    public ResponseEntity<List<ArticleOFExtern>> getAllOFExternArticles(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters,
            @RequestParam(value = "id", required = true) Long id
    ){
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<ArticleOFExtern> ofEntity = ofExternArticleService.getArticleOFExternById(id,pageable);
        System.out.println("ddddddddd : "+String.valueOf(ofEntity.getTotalElements()));
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(ofEntity.getTotalElements()));
        return new ResponseEntity<>(ofEntity.getContent(),headers, HttpStatus.OK);
    }

//    @GetMapping("/pieces-unitaire")
//    public ResponseEntity<List<ArticleOFExtern>> getOFExternArticleById(
//            @RequestParam(value = "size", defaultValue = "10") int size,
//            @RequestParam(value = "page", defaultValue = "0") int page,
//            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
//            @RequestParam(value = "filter", required = false) List<String> filters
//    ){
//        Specification<ArticleOFExtern> specification = paginationAndFilterService.getSearchSpecification(filters);
//        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
//        Page<ArticleOFExtern> ofEntity = ofExternArticleService.getArticleOFExternById(specification,pageable);
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(ofEntity.getTotalElements()));
//        return new ResponseEntity<>(ofEntity.getContent(),headers, HttpStatus.OK);
//    }

    @PutMapping("/pieces-unitaire")
    public ResponseEntity<ArticleOFExtern> updateOFExternArticle(@RequestBody ArticleOFExtern of){
        ArticleOFExtern ofEntity = ofExternArticleService.updateArticleOFExtern(of);
        return ResponseEntity.status(HttpStatus.CREATED).body(ofEntity);
    }

    @DeleteMapping("/pieces-unitaire/{id}")
    public ResponseEntity<Void> deleteOFExternArticle(@PathVariable Long id){
        boolean result = ofExternArticleService.deleteArticleOFExtern(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
