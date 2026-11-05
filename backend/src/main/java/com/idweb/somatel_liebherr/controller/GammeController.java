package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Gamme;
import com.idweb.somatel_liebherr.service.services.GammeService;
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
@RequestMapping("/api/v1/gamme")
@Tag(name = "Gamme Management", description = "Operations related to gamme management")
public class GammeController {

    private final GammeService gammeService;
    private final PaginationAndFilterService paginationAndFilterService;

    public GammeController(GammeService gammeService, PaginationAndFilterService gammeCrateriaRepository, PaginationAndFilterService paginationAndFilterService) {
        this.gammeService = gammeService;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<Gamme> addGamme(@RequestBody Gamme gamme){

        Gamme gammeEntity = gammeService.addGamme(gamme);
        return ResponseEntity.status(HttpStatus.CREATED).body(gammeEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Gamme>> getAllGammes(@PathVariable Long id){
//        Specification<Gamme> specification = paginationAndFilterService.getSearchSpecification(filters);
//        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        List<Gamme> gammesEntity = gammeService.getAllGammesArticle(id);
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(gammesEntity.getTotalElements()));
        return new ResponseEntity<>(gammesEntity, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Gamme> updateGamme(@RequestBody Gamme gamme){
        Gamme gammentity = gammeService.updateGamme(gamme);
        return ResponseEntity.status(HttpStatus.CREATED).body(gammentity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGamme(@PathVariable Long id){
        boolean result = gammeService.deleteGamme(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
}
