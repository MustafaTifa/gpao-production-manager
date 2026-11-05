package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.OFIntern;
import com.idweb.somatel_liebherr.model.DTOs.OFDetailDTO;
import com.idweb.somatel_liebherr.service.services.OFInternService;
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
@RequestMapping("/api/v1/of_intern")
@Tag(name = "OF Management", description = "OF related to article management")
public class OFInternController {

    private final OFInternService ofInternService;
    private final PaginationAndFilterService paginationAndFilterService;

    public OFInternController(OFInternService ofInternService, PaginationAndFilterService filterService) {
        this.ofInternService = ofInternService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping()
    public ResponseEntity<OFIntern> addOFIntern(@RequestBody OFIntern ofIntern){
        OFIntern ofInterneEntity = ofInternService.addOFIntern(ofIntern);
        return ResponseEntity.status(HttpStatus.CREATED).body(ofInterneEntity);
    }

    @GetMapping()
    public ResponseEntity<List<OFIntern>> getAllOFInterns(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<OFIntern> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<OFIntern> ofInternsEntity = ofInternService.getAllOFInterns(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(ofInternsEntity.getTotalElements()));
        return new ResponseEntity<>(ofInternsEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OFIntern> getOFInternById(@PathVariable String id){
        Optional<OFIntern> ofInternEntity = ofInternService.getOFInternById(id);
        return ofInternEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<OFIntern> updateOFIntern(@RequestBody OFIntern ofIntern){
        OFIntern groupEntity = ofInternService.updateOFIntern(ofIntern);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<OFDetailDTO> getOFDetail(@PathVariable Long id){
        OFDetailDTO detail = ofInternService.getOFDetail(id);
        return ResponseEntity.ok(detail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOFIntern(@PathVariable Long id){
        boolean result = ofInternService.deleteOFIntern(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
