package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.GED;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface GEDInterface {

    GED addGED(GED ged);

    List<GED> getAllGEDs(Long articleId);

    Optional<GED> getGEDById(Long id);

    GED updateGED(GED ged);

    boolean deleteGED(Long id);
}
