package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.Groupe;
import com.idweb.somatel_liebherr.shared.PaginationAndFilterService;
import com.idweb.somatel_liebherr.repository.GroupRepository;
import com.idweb.somatel_liebherr.service.interfaces.GroupInterface;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService implements GroupInterface {

    private final GroupRepository groupRepository;
    private final PaginationAndFilterService groupCrateriaRepository;

    public GroupService(GroupRepository groupRepository, PaginationAndFilterService groupCrateriaRepository) {
        this.groupRepository = groupRepository;
        this.groupCrateriaRepository = groupCrateriaRepository;
    }

    @Override
    public Groupe addGroup(Groupe groupe) {
        try {
            return groupRepository.save(groupe);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<Groupe> getAllGroups(Specification<Groupe> specification, Pageable pageable) {
        try {
            return groupRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<Groupe> getGroupById(Long id) {
        try {
            return groupRepository.findById(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Groupe updateGroup(Groupe groupe) {

        return groupRepository.findById(groupe.getId()).map(g -> {
            g.setLibelle(groupe.getLibelle());
            g.setObservation(groupe.getObservation());
            g.setCodeGroup(groupe.getCodeGroup());
            return groupRepository.save(g);
        }).orElseThrow(() -> new DatabaseException("Group not found"));
    }

    @Override
    public boolean deleteGroup(Long id) {
        try {
            groupRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
