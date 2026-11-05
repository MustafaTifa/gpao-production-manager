package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Travailleur;
import com.idweb.somatel_liebherr.service.services.TravailleurService;
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
@RequestMapping("/api/v1/travailleur")
@Tag(name = "Travailleur Management", description = "Operations related to travailleur management")
public class TravailleurController {

    private final TravailleurService travailleurService;
    private final PaginationAndFilterService paginationAndFilterService;

    public TravailleurController(TravailleurService travailleurService, PaginationAndFilterService filterService) {
        this.travailleurService = travailleurService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<Travailleur> addTravailleur(@RequestBody Travailleur travailleur) {
        Travailleur travailleurEntity = travailleurService.addTravailleur(travailleur);
        return ResponseEntity.status(HttpStatus.CREATED).body(travailleurEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Travailleur>> getAllTravailleurs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ) {
        Specification<Travailleur> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Travailleur> travailleursEntity = travailleurService.getAllTravailleurs(specification, pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count", String.valueOf(travailleursEntity.getTotalElements()));
        return new ResponseEntity<>(travailleursEntity.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Travailleur> getTravailleurById(@PathVariable Long id) {
        Optional<Travailleur> travailleurEntity = travailleurService.getTravailleurById(id);
        return travailleurEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<Travailleur> updateTravailleur(@RequestBody Travailleur travailleur) {
        Travailleur groupEntity = travailleurService.updateTravailleur(travailleur);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTravailleur(@PathVariable Long id) {
        boolean result = travailleurService.deleteTravailleur(id);
        if (result) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}