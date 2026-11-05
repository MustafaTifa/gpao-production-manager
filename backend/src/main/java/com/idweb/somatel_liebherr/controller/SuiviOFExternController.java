package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOFExtern;
import com.idweb.somatel_liebherr.service.services.NomenclatureService;
import com.idweb.somatel_liebherr.service.services.SuiviOFExternService;
import com.idweb.somatel_liebherr.service.services.SuiviOFService;
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
@RequestMapping("/api/v1/of_suivi_extern")
@Tag(name = "OF Extern Suivi Management", description = "OF Extern Suivi related to article management")
public class SuiviOFExternController {
    private final SuiviOFExternService ofExternService;
    private final PaginationAndFilterService paginationAndFilterService;

    public SuiviOFExternController(SuiviOFExternService ofExternService, NomenclatureService nomenclatureService, PaginationAndFilterService filterService) {
        this.ofExternService = ofExternService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<SuiviOFExtern> addSuiviOF(@RequestBody SuiviOFExtern suiviOF){
        SuiviOFExtern suiviOFEntity = ofExternService.addSuiviOF(suiviOF);
        return ResponseEntity.status(HttpStatus.CREATED).body(suiviOFEntity);
    }

    @GetMapping()
    public ResponseEntity<List<SuiviOFExtern>> getAllSuiviOFs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<SuiviOFExtern> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<SuiviOFExtern> suiviOFsEntity = ofExternService.getAllSuiviOFs(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(suiviOFsEntity.getTotalElements()));
        return new ResponseEntity<>(suiviOFsEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuiviOFExtern> getSuiviOFById(@PathVariable Long id){
        Optional<SuiviOFExtern> suiviOFntity = ofExternService.getSuiviOFById(id);
        return suiviOFntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<SuiviOFExtern> updateSuiviOF(@RequestBody SuiviOFExtern suiviOF){
        SuiviOFExtern groupEntity = ofExternService.updateSuiviOF(suiviOF);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuiviOF(@PathVariable Long id){
        boolean result = ofExternService.deleteSuiviOF(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
