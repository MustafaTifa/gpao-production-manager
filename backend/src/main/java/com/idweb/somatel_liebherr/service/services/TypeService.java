package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Type;
import com.idweb.somatel_liebherr.repository.TypeRepository;
import com.idweb.somatel_liebherr.service.interfaces.TypeInterface;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TypeService implements TypeInterface {

    private final TypeRepository typeRepository;
    private final PaginationAndFilterService typeCriteriaRepository;

    public TypeService(TypeRepository typeRepository, PaginationAndFilterService typeCriteriaRepository) {
        this.typeRepository = typeRepository;
        this.typeCriteriaRepository = typeCriteriaRepository;
    }

    @Override
    public Type addType(Type type) {
        try {
            return typeRepository.save(type);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Type> getAllTypes(Specification<Type> specification, Pageable pageable) {
        try {
            return typeRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Type> getTypeById(Long id) {
        try {
            return typeRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Type updateType(Type type) {

        return typeRepository.findById(type.getId()).map(g -> {
            g.setLibelle(type.getLibelle());
            g.setObservation(type.getObservation());
            g.setCodeType(type.getCodeType());
            return typeRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Type not found"));
    }

    @Override
    public boolean deleteType(Long id) {
        try {
            typeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
