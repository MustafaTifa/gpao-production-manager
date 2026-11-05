package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Type;
import com.idweb.somatel_liebherr.service.services.TypeService;
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
@RequestMapping("/api/v1/type")
@Tag(name = "Type Management", description = "Operations related to type management")
public class TypeController {

    private final TypeService typeService;
    private final PaginationAndFilterService paginationAndFilterService;

    public TypeController(TypeService typeService, PaginationAndFilterService paginationAndFilterService) {
        this.typeService = typeService;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<Type> addType(@RequestBody Type type){
        System.out.println(type);
        Type typeEntity = typeService.addType(type);
        return ResponseEntity.status(HttpStatus.CREATED).body(typeEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Type>> getAllTypes(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<Type> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Type> typesEntity = typeService.getAllTypes(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(typesEntity.getTotalElements()));
        return new ResponseEntity<>(typesEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable Long id){
        Optional<Type> typeEntity = typeService.getTypeById(id);
        return typeEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<Type> updateType(@RequestBody Type type){
        Type groupEntity = typeService.updateType(type);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteType(@PathVariable Long id){
        boolean result = typeService.deleteType(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
