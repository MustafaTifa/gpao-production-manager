package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.DTOs.TravailleurWorkDTO;
import com.idweb.somatel_liebherr.model.NomenclatureOF;
import com.idweb.somatel_liebherr.model.SuiviOF;
import com.idweb.somatel_liebherr.service.services.NomenclatureService;
import com.idweb.somatel_liebherr.service.services.SuiviOFService;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/of_suivi")
@Tag(name = "OF Suivi Management", description = "OF Suivi related to article management")
public class SuiviOFController {


    private final SuiviOFService suiviOFService;
    private final PaginationAndFilterService paginationAndFilterService;

    public SuiviOFController(SuiviOFService suiviOFService, NomenclatureService nomenclatureService, PaginationAndFilterService filterService) {
        this.suiviOFService = suiviOFService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<SuiviOF> addSuiviOF(@RequestBody SuiviOF suiviOF){
        SuiviOF suiviOFEntity = suiviOFService.addSuiviOF(suiviOF);
        return ResponseEntity.status(HttpStatus.CREATED).body(suiviOFEntity);
    }

    @PostMapping("nomenclature_of")
    public ResponseEntity<NomenclatureOF> addNomenclatureOF(@RequestBody NomenclatureOF nomenclatureOF){
        NomenclatureOF nomenclatureOFEntity = suiviOFService.addNomenclatureOF(nomenclatureOF);
        return ResponseEntity.status(HttpStatus.CREATED).body(nomenclatureOFEntity);
    }

    @GetMapping("/work-by-travailleur")
    public ResponseEntity<List<TravailleurWorkDTO>> getWorkByTravailleur(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(value = "workstationId", required = false) Long workstationId
    ) {
        List<TravailleurWorkDTO> workData = suiviOFService.getWorkByTravailleur(startDate, endDate, workstationId);
        return ResponseEntity.ok(workData);
    }

    @GetMapping("/{idOF}")
    public ResponseEntity<List<SuiviOF>> getAllSuiviOFs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters,
            @PathVariable Long idOF
    ){
        Specification<SuiviOF> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        List<SuiviOF> suiviOFsEntity = suiviOFService.getAllSuiviOFs(idOF,specification,pageable);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(suiviOFsEntity.getTotalElements()));
        return new ResponseEntity<>(suiviOFsEntity,headers, HttpStatus.OK);
    }

    @GetMapping("nomenclature_of/{idOF}")
    public ResponseEntity<List<NomenclatureOF>> getAllNomenclactureOFs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters,
            @PathVariable Long idOF
    ){
        Specification<NomenclatureOF> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        List<NomenclatureOF> nomenclatureOFsEntity = suiviOFService.getAllNomenclatureOF(idOF);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count",String.valueOf(suiviOFsEntity.getTotalElements()));
        return new ResponseEntity<>(nomenclatureOFsEntity,headers, HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<SuiviOF> getSuiviOFById(@PathVariable Long id){
//        Optional<SuiviOF> suiviOFntity = suiviOFService.getSuiviOFById(id);
//        return suiviOFntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//    }

    @PutMapping("nomenclature_of")
    public ResponseEntity<NomenclatureOF> updateNomenclatureOF(@RequestBody NomenclatureOF nomenclatureOf){
        NomenclatureOF groupEntity = suiviOFService.updateNomenclatureOF(nomenclatureOf);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @PutMapping()
    public ResponseEntity<SuiviOF> updateSuiviOF(@RequestBody SuiviOF suiviOF){
        SuiviOF groupEntity = suiviOFService.updateSuiviOF(suiviOF);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuiviOF(@PathVariable Long id){
        boolean result = suiviOFService.deleteSuiviOF(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
