package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Engin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface EnginInterface {
    Engin addEngin(Engin Engin);

    Page<Engin> getAllEngins(Specification<Engin> specification, Pageable pageable);

    Optional<Engin> getEnginById(Long id);

    Engin updateEngin(Engin Engin);

    boolean deleteEngin(Long id);
}
