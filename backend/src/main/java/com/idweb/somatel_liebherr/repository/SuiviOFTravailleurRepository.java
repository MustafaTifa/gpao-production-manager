package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.SuiviOFTravailleur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SuiviOFTravailleurRepository extends JpaRepository<SuiviOFTravailleur, Long> {

    @Query("SELECT s FROM SuiviOFTravailleur s WHERE s.suiviOf.id = :suiviOfId")
    List<SuiviOFTravailleur> findAllBySuiviOfId(@Param("suiviOfId") Long suiviOfId);

    @Query("SELECT s FROM SuiviOFTravailleur s WHERE s.travailleur.id = :travailleurId")
    List<SuiviOFTravailleur> findAllByTravailleurId(@Param("travailleurId") Long travailleurId);

    @Modifying
    @Query("DELETE FROM SuiviOFTravailleur s WHERE s.suiviOf.id = :suiviOfId")
    void deleteAllBySuiviOfId(@Param("suiviOfId") Long suiviOfId);
}
