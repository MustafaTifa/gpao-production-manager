package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.Groupe;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.service.services.GroupService;
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
@RequestMapping("/api/v1/group")
@Tag(name = "Groupe Management", description = "Operations related to group management")
public class GroupController {

    private final GroupService groupServiceImplimentation;
    private final PaginationAndFilterService paginationAndFilterService;

    public GroupController(GroupService groupServiceImplimentation, PaginationAndFilterService groupCrateriaRepository, PaginationAndFilterService paginationAndFilterService) {
        this.groupServiceImplimentation = groupServiceImplimentation;
        this.paginationAndFilterService = paginationAndFilterService;
    }

    @PostMapping()
    public ResponseEntity<Groupe> addGroup(@RequestBody Groupe groupe){
        System.out.println(groupe);
        Groupe groupeEntity = groupServiceImplimentation.addGroup(groupe);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupeEntity);
    }

    @GetMapping()
    public ResponseEntity<List<Groupe>> getAllGroups(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters
    ){
        Specification<Groupe> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        Page<Groupe> groupesEntity = groupServiceImplimentation.getAllGroups(specification,pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count",String.valueOf(groupesEntity.getTotalElements()));
        return new ResponseEntity<>(groupesEntity.getContent(),headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Groupe> getGroupById(@PathVariable Long id){
        Optional<Groupe> groupeEntity = groupServiceImplimentation.getGroupById(id);
        return groupeEntity.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<Groupe> updateGroup(@RequestBody Groupe groupe){
        Groupe groupEntity = groupServiceImplimentation.updateGroup(groupe);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id){
        boolean result = groupServiceImplimentation.deleteGroup(id);
        if(result){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
