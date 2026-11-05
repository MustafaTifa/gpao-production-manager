package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.SuiviOF;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SuiviOFRepository extends JpaRepository<SuiviOF, Long>, JpaSpecificationExecutor<SuiviOF> {

    @Query(value="SELECT \n" +
            "    g.execution_time, \n" +
            "    g.operation, \n" +
            "    g.pos, \n" +
            "    g.id_workstation,\n" +
            "    ARRAY_AGG(DISTINCT t.id) AS workers,\n" +
            "    ARRAY_AGG(DISTINCT a.id) AS articles,\n" +
            "    g.operation_detail,\n" +
            "    g.preparation_time,\n" +
            "    g.gs,\n" +
            "    g.rc,\n" +
            "    g.observation\n" +
            "FROM public.article_gamme ag\n" +
            "JOIN article a ON a.id = ag.article_id \n" +
            "JOIN gamme g ON g.id = ag.gamme_id\n" +
            "JOIN workstation w ON w.id = g.id_workstation\n" +
            "JOIN travailleur t ON t.id_workstation = w.id\n" +
            "WHERE g.id IN (\n" +
            "    SELECT gamme_id \n" +
            "    FROM article_gamme \n" +
            "    WHERE article_id = :articleId AND type = 0\n" +
            ")\n" +
            "GROUP BY \n" +
            "    g.execution_time, \n" +
            "    g.id_workstation, \n" +
            "    g.operation, \n" +
            "    g.pos, \n" +
            "    g.operation_detail, \n" +
            "    g.preparation_time, \n" +
            "    g.gs, \n" +
            "    g.rc, \n" +
            "    g.observation;", nativeQuery = true)
    List<Object[]> getStandardGammeToSave (Long articleId);

    @Query(value="SELECT *FROM public.suivi_of\n" +
            "where id_of = :idOF", nativeQuery = true)
    List<SuiviOF> findAllByOFID(Long idOF);

    @Query(value = "SELECT " +
            "o.numberof, " +
            "s.operation, " +
            "t.id AS travailleur_id, " +
            "t.libelle AS travailleur_libelle, " +
            "w.libelle AS workstation_libelle, " +
            "SUM(sot.quantite * sot.temp_effectif) AS total_temp_effectif " +
            "FROM suivi_of_travailleur sot " +
            "JOIN suivi_of s ON s.id = sot.suivi_of_id " +
            "JOIN travailleur t ON t.id = sot.travailleur_id " +
            "JOIN workstation w ON w.id = s.id_workstation " +
            "JOIN of_intern o ON o.id = s.id_of " +
            "WHERE s.start_date >= :startDate AND s.end_date <= :endDate " +
            "GROUP BY t.id, t.libelle, o.numberof, s.operation, w.libelle " +
            "ORDER BY t.id", nativeQuery = true)
    List<Object[]> getWorkByTravailleur(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);

    @Query(value = "SELECT " +
            "o.numberof, " +
            "s.operation, " +
            "t.id AS travailleur_id, " +
            "t.libelle AS travailleur_libelle, " +
            "w.libelle AS workstation_libelle, " +
            "SUM(sot.quantite * sot.temp_effectif) AS total_temp_effectif " +
            "FROM suivi_of_travailleur sot " +
            "JOIN suivi_of s ON s.id = sot.suivi_of_id " +
            "JOIN travailleur t ON t.id = sot.travailleur_id " +
            "JOIN workstation w ON w.id = s.id_workstation " +
            "JOIN of_intern o ON o.id = s.id_of " +
            "WHERE s.start_date >= :startDate AND s.end_date <= :endDate " +
            "AND w.id = :workstationId " +
            "GROUP BY t.id, t.libelle, o.numberof, s.operation, w.libelle " +
            "ORDER BY t.id", nativeQuery = true)
    List<Object[]> getWorkByTravailleurAndWorkstation(@Param("startDate") LocalDateTime startDate,
                                                       @Param("endDate") LocalDateTime endDate,
                                                       @Param("workstationId") Long workstationId);
}
