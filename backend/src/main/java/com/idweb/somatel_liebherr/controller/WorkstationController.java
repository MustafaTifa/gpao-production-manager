package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Workstation;
import com.idweb.somatel_liebherr.service.services.WorkstationService;
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
@RequestMapping("/api/v1/workstation")
@Tag(name = "Workstation Management", description = "Operations related to workstation management")
public class WorkstationController {

    private final WorkstationService workstationService;
    private final PaginationAndFilterService paginationAndFilterService;

    public WorkstationController(WorkstationService workstationService, PaginationAndFilterService paginationAndFilterService) {
        this.workstationService = workstationService;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<Workstation> addWorkstation(@RequestBody Workstation workstation){
        System.out.println(workstation);
        Workstation workstationEntity = workstationService.addWorkstation(workstation);
        return ResponseEntity.status(HttpStatus.CREATED).body(workstationEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Workstation>> getAllWorkstations(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<Workstation> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Workstation> workstationsEntity = workstationService.getAllWorkstations(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(workstationsEntity.getTotalElements()));
        return new ResponseEntity<>(workstationsEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workstation> getWorkstationById(@PathVariable Long id){
        Optional<Workstation> workstationEntity = workstationService.getWorkstationById(id);
        return workstationEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<Workstation> updateWorkstation(@RequestBody Workstation workstation){
        Workstation groupEntity = workstationService.updateWorkstation(workstation);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkstation(@PathVariable Long id){
        boolean result = workstationService.deleteWorkstation(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
