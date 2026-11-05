package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.NomenclatureOF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NomenclatureOFRepository extends JpaRepository<NomenclatureOF, Long>, JpaSpecificationExecutor<NomenclatureOF> {
    @Query(value="SELECT * FROM nomenclature_of\n" +
            "where id_of = :idOF", nativeQuery = true)
    List<NomenclatureOF> findAllByOFID(Long idOF);
}
