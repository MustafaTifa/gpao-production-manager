package com.idweb.somatel_liebherr.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.idweb.somatel_liebherr.model.Article;
import com.idweb.somatel_liebherr.model.GED;
import com.idweb.somatel_liebherr.service.services.GEDService;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ged")
@Tag(name = "GED Management", description = "Operations related to GED management")
public class GEDController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final GEDService gedService;
    private final PaginationAndFilterService paginationAndFilterService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public GEDController(GEDService gedService, PaginationAndFilterService filterService) {
        this.gedService = gedService;
        this.paginationAndFilterService = filterService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GED> addGED(@RequestParam("ged") String gedJson,
                                      @RequestParam("file") MultipartFile file) throws IOException {

        GED ged = objectMapper.readValue(gedJson, GED.class);

        String filename = UUID.randomUUID().toString() + "_" + ged.getFileName();
        Path filePath = Paths.get(uploadDir, filename);
        ged.setFileNameINDataBsae(filename);
        GED gedEntity = gedService.addGED(ged);
        // Ensure directory exists
        Files.createDirectories(filePath.getParent());
        // Save the file to the filesystem
        file.transferTo(filePath.toFile());
        return ResponseEntity.status(HttpStatus.CREATED).body(gedEntity);
    }

    @GetMapping()
    public ResponseEntity<List<GED>> getAllGEDs(
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "sort", defaultValue = "Id,desc") String sort,
            @RequestParam(value = "filter", required = false) List<String> filters,
            @RequestParam(value = "id") Long articleId
    ) {
        Specification<GED> specification = paginationAndFilterService.getSearchSpecification(filters);
        Pageable pageable = paginationAndFilterService.getPagable(size, page, sort);
        List<GED> gedsEntity = gedService.getAllGEDs(articleId);
        HttpHeaders headers = new HttpHeaders();
//        headers.set("X-Total-Count", String.valueOf(gedsEntity.getTotalElements()));
        return new ResponseEntity<>(gedsEntity, headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GED> getGEDById(@PathVariable Long id) {
        Optional<GED> gedEntity = gedService.getGEDById(id);
        return gedEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping()
    public ResponseEntity<GED> updateGED(@RequestBody GED ged) {
        GED groupEntity = gedService.updateGED(ged);
        return ResponseEntity.status(HttpStatus.CREATED).body(groupEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGED(@PathVariable Long id) {
        boolean result = gedService.deleteGED(id);
        if (result) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
