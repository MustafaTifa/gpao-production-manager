package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.Groupe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface GroupInterface {

    Groupe addGroup(Groupe groupe);

    Page<Groupe> getAllGroups(Specification<Groupe> specification, Pageable pageable);

    Optional<Groupe> getGroupById(Long id);

    Groupe updateGroup(Groupe groupe);

    boolean deleteGroup(Long id);
}
