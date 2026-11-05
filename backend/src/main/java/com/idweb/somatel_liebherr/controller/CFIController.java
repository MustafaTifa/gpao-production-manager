package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.CFI;
import com.idweb.somatel_liebherr.service.services.CFIService;
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
@RequestMapping("/api/v1/cfi")
@Tag(name = "CFI Management", description = "Operations related to cfi management")
public class CFIController {

    private final CFIService cfiService;
    private final PaginationAndFilterService paginationAndFilterService;

    public CFIController(CFIService cfiService, PaginationAndFilterService paginationAndFilterService) {
        this.cfiService = cfiService;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<CFI> addCFI(@RequestBody CFI cfi){
        System.out.println(cfi);
        CFI cfiEntity = cfiService.addCFI(cfi);
        return ResponseEntity.status(HttpStatus.CREATED).body(cfiEntity);
    }

    @GetMapping()
    public ResponseEntity<List<CFI>> getAllCFIs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<CFI> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<CFI> cfisEntity = cfiService.getAllCFIs(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(cfisEntity.getTotalElements()));
        return new ResponseEntity<>(cfisEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CFI> getCFIById(@PathVariable Long id){
        Optional<CFI> cfiEntity = cfiService.getCFIById(id);
        return cfiEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<CFI> updateCFI(@RequestBody CFI cfi){
        CFI groupEntity = cfiService.updateCFI(cfi);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCFI(@PathVariable Long id){
        boolean result = cfiService.deleteCFI(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
