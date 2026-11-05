package com.idweb.somatel_liebherr.controller;

import com.idweb.somatel_liebherr.model.SuiviOFTravailleur;
import com.idweb.somatel_liebherr.service.services.SuiviOFTravailleurService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/suivi_of_travailleur")
@Tag(name = "SuiviOF Travailleur Management", description = "Association between SuiviOF and Travailleur")
public class SuiviOFTravailleurController {

    private final SuiviOFTravailleurService service;

    public SuiviOFTravailleurController(SuiviOFTravailleurService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SuiviOFTravailleur> add(@RequestBody SuiviOFTravailleur suiviOFTravailleur) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.add(suiviOFTravailleur));
    }

    @GetMapping("/suivi_of/{suiviOfId}")
    public ResponseEntity<List<SuiviOFTravailleur>> getAllBySuiviOf(@PathVariable Long suiviOfId) {
        return ResponseEntity.ok(service.getAllBySuiviOfId(suiviOfId));
    }

    @GetMapping("/travailleur/{travailleurId}")
    public ResponseEntity<List<SuiviOFTravailleur>> getAllByTravailleur(@PathVariable Long travailleurId) {
        return ResponseEntity.ok(service.getAllByTravailleurId(travailleurId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuiviOFTravailleur> getById(@PathVariable Long id) {
        Optional<SuiviOFTravailleur> entity = service.getById(id);
        return entity.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping
    public ResponseEntity<SuiviOFTravailleur> update(@RequestBody SuiviOFTravailleur suiviOFTravailleur) {
        return ResponseEntity.ok(service.update(suiviOFTravailleur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean result = service.delete(id);
        if (result) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
