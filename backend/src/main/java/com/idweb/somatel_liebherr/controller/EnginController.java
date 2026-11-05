package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Engin;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.service.services.EnginService;
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
@RequestMapping("/api/v1/engin")
@Tag(name = "Engin Management", description = "Operations related to engin management")
public class EnginController {

    private final EnginService enginService;
    private final PaginationAndFilterService paginationAndFilterService;

    public EnginController(EnginService enginService, PaginationAndFilterService paginationAndFilterService) {
        this.enginService = enginService;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<Engin> addEngin(@RequestBody Engin Engin){
        System.out.println(Engin);
        Engin enginEntity = enginService.addEngin(Engin);
        return ResponseEntity.status(HttpStatus.CREATED).body(enginEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Engin>> getAllEngins(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<Engin> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Engin> enginsEntity = enginService.getAllEngins(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(enginsEntity.getTotalElements()));
        return new ResponseEntity<>(enginsEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Engin> getEnginById(@PathVariable Long id){
        Optional<Engin> enginEntity = enginService.getEnginById(id);
        return enginEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<Engin> updateEngin(@RequestBody Engin Engin){
        Engin enginEntity = enginService.updateEngin(Engin);
        return ResponseEntity.status(HttpStatus.CREATED).body(enginEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEngin(@PathVariable Long id){
        boolean result = enginService.deleteEngin(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
