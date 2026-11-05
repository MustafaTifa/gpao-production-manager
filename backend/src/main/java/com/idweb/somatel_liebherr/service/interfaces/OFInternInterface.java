package com.idweb.somatel_liebherr.service.interfaces;

import com.idweb.somatel_liebherr.model.OFIntern;
import com.idweb.somatel_liebherr.model.DTOs.OFDetailDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface OFInternInterface {

    OFIntern addOFIntern(OFIntern OFIntern);

    Page<OFIntern> getAllOFInterns(Specification<OFIntern> specification, Pageable pageable);

    Optional<OFIntern> getOFInternById(String id);

    OFIntern updateOFIntern(OFIntern OFIntern);

    boolean deleteOFIntern(Long id);

    OFDetailDTO getOFDetail(Long id);

}
