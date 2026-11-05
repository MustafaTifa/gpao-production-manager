package com.idweb.somatel_liebherr.service.services;

import com.idweb.somatel_liebherr.model.ArticleOFExtern;
import com.idweb.somatel_liebherr.model.OFExtern;
import com.idweb.somatel_liebherr.model.OFIntern;
import com.idweb.somatel_liebherr.repository.OFExternRepository;
import com.idweb.somatel_liebherr.service.interfaces.OFExternInterface;
import com.idweb.somatel_liebherr.shared.exceptions.DatabaseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OFExternService implements OFExternInterface {
    private final OFExternRepository ofExternRepository;

    public OFExternService(OFExternRepository ofExternRepository) {
        this.ofExternRepository = ofExternRepository;
    }

    @Override
    public OFExtern addOFExtern(OFExtern ofExtern) {
        try {
            return ofExternRepository.save(ofExtern);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Page<OFExtern> getAllOFExterns(Specification<OFExtern> specification, Pageable pageable) {
        try {
            return ofExternRepository.findAll(specification,pageable);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public Optional<OFExtern> getOFExternById(String id) {
        try {
            return ofExternRepository.findByNumberOF(id);
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }

    @Override
    public OFExtern updateOFExtern(OFExtern ofExtern) {
        return ofExternRepository.findById(ofExtern.getId()).map(of -> {
            of.setNumberOF(ofExtern.getNumberOF());
            of.setDate(ofExtern.getDate());
            of.setDelai(ofExtern.getDelai());
            of.setBonDeCommande(ofExtern.getBonDeCommande());
            of.setObservation(ofExtern.getObservation());

            return ofExternRepository.save(of);
        }).orElseThrow(() -> new DatabaseException("OF Extern not found"));
    }

    @Override
    public boolean deleteOFExtern(Long id) {
        try {
            ofExternRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new DatabaseException(e.getMessage(),e);
        }
    }
}
