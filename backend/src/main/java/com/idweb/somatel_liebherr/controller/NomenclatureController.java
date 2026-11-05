package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.ArticleNomenclature;
import com.idweb.somatel_liebherr.model.Groupe;
import com.idweb.somatel_liebherr.model.Nomenclature;
import com.idweb.somatel_liebherr.service.services.NomenclatureService;
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

@RestController
@RequestMapping("/api/v1/nomenclature")
@Tag(name = "Nomenclature Management", description = "Operations related to nomenclature management")
public class NomenclatureController {

    private final NomenclatureService nomenclatureService;
    private final PaginationAndFilterService filterService;


    public NomenclatureController(NomenclatureService nomenclatureService, PaginationAndFilterService filterService) {
        this.nomenclatureService = nomenclatureService;
        this.filterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<ArticleNomenclature> addArticleNomenclature(@RequestBody ArticleNomenclature nomenclature){
        ArticleNomenclature nomenclatureEntity = nomenclatureService.addArticleNomenclature(nomenclature);
        return ResponseEntity.status(HttpStatus.CREATED).body(nomenclatureEntity);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<ArticleNomenclature>> getAllArticleNomenclatures(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @PathVariable Long id
    ){
        Pageable pageable = filterService.getPagable(size, page, sort);
        List<ArticleNomenclature> nomenclatureEntity = nomenclatureService.getAllArticleNomenclatures(id);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(nomenclatureEntity.getTotalElements()));
        return new ResponseEntity<>(nomenclatureEntity,headers, HttpStatus.OK);
    }

    @PostMapping("/all")
    public ResponseEntity<List<ArticleNomenclature>> getAllArticleNomenclatures(
//            @RequestParam(value = "size", defaultValue = "10") int size,
//            @RequestParam(value = "page", defaultValue = "0") int page,
//            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestBody List<Long> ids
    ){
//        Pageable pageable = filterService.getPagable(size, page, sort);
        System.out.println("ids------- "+ids);
        List<ArticleNomenclature> nomenclatureEntity = nomenclatureService.getAllArticleNomenclaturesUsingIds(ids);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(nomenclatureEntity.getTotalElements()));
        return new ResponseEntity<>(nomenclatureEntity,headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nomenclature> getAllNomenclatures(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @PathVariable Long id
    ){
        Pageable pageable = filterService.getPagable(size, page, sort);
        Nomenclature nomenclatureEntity = nomenclatureService.getNomenclatureByArticleId(id);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(nomenclatureEntity.getTotalElements()));
        return new ResponseEntity<>(nomenclatureEntity,headers, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ArticleNomenclature> updateNomenclature(@RequestBody ArticleNomenclature nomenclature){
        ArticleNomenclature nomenclatureEntity = nomenclatureService.updateArticleNomenclature(nomenclature);
        return ResponseEntity.status(HttpStatus.CREATED).body(nomenclatureEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id){
        boolean result = nomenclatureService.deleteArticleNomenclature(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
