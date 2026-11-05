package com.idweb.somatel_liebherr.controller;



import com.idweb.somatel_liebherr.model.SousGroupe;
import com.idweb.somatel_liebherr.service.services.SousGroupService;
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
@RequestMapping("/api/v1/sous-group")
@Tag(name = "Sous-Groupe Management", description = "Operations related to sous-group management")
public class SousGroupController {

    private final SousGroupService sousGroupService;
    private final PaginationAndFilterService paginationAndFilterService;

    public SousGroupController(SousGroupService sousGroupService, PaginationAndFilterService filterService) {
        this.sousGroupService = sousGroupService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<SousGroupe> addGroup(@RequestBody SousGroupe groupe){
        SousGroupe sousGroupeEntity = sousGroupService.addSousGroup(groupe);
        return ResponseEntity.status(HttpStatus.CREATED).body(sousGroupeEntity);
    }

    @GetMapping()
    public ResponseEntity<List<SousGroupe>> getAllGroups(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<SousGroupe> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<SousGroupe> groupesEntity = sousGroupService.getAllSousGroups(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(groupesEntity.getTotalElements()));
        return new ResponseEntity<>(groupesEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SousGroupe> getGroupById(@PathVariable Long id){
        Optional<SousGroupe> groupeEntity = sousGroupService.getSousGroupById(id);
        return groupeEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<SousGroupe> updateGroup(@RequestBody SousGroupe groupe){
        SousGroupe groupEntity = sousGroupService.updateSousGroup(groupe);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id){
        boolean result = sousGroupService.deleteSousGroup(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

