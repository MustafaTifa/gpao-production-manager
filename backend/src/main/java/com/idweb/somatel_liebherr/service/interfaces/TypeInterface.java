package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Groupe;
import com.idweb.somatel_liebherr.model.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface TypeInterface {

    Type addType(Type groupe);

    Page<Type> getAllTypes(Specification<Type> specification, Pageable pageable);

    Optional<Type> getTypeById(Long id);

    Type updateType(Type groupe);

    boolean deleteType(Long id);
}
