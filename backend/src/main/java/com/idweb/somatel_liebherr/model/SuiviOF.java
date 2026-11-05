package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "suivi_of")
public class SuiviOF {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(nullable = false)
    private long idOf;

    @Column(nullable = false)
    private long idWorkstation;

    @Column(nullable = true)
    private long idArticle;

    @Column(nullable = true)
    private List<Long> idsArticles;

    @Column(nullable = false)
    private String pos;

    @Column(nullable = false)
    private Long executionTime;

    @Column(nullable = false)
    private String operation;

    @Column(columnDefinition = "TEXT")
    private String operationDetail;

    @Column
    private Long preparationTime;

    @Column(length = 100)
    private String gs;

    @Column(length = 50)
    private String rc;

    @Column(length = 200)
    private String observation;

    @Column(nullable = true)
    private LocalDateTime startDate;

    @Column(nullable = true)
    private LocalDateTime endDate;

    @Transient
    private List<SuiviOFTravailleur> travailleurs;

    public SuiviOF() {
    }

    public SuiviOF(long idOf, long idArticle, long idWorkstation, List<Long> idsArticles, String pos, Long executionTime, String operation, String operationDetail, Long preparationTime, String gs, String rc, String observation) {
        this.idOf = idOf;
        this.idWorkstation = idWorkstation;
        this.idArticle = idArticle;
        this.idsArticles = idsArticles;
        this.pos = pos;
        this.executionTime = executionTime;
        this.operation = operation;
        this.operationDetail = operationDetail;
        this.preparationTime = preparationTime;
        this.gs = gs;
        this.rc = rc;
        this.observation = observation;
    }

    public SuiviOF(long idOf, long idArticle, long idWorkstation, List<Long> idsArticles, String pos, Long executionTime, String operation, String operationDetail, Long preparationTime, String gs, String rc, String observation, LocalDateTime startDate, LocalDateTime endDate) {
        this.idOf = idOf;
        this.idWorkstation = idWorkstation;
        this.idArticle = idArticle;
        this.idsArticles = idsArticles;
        this.pos = pos;
        this.executionTime = executionTime;
        this.operation = operation;
        this.operationDetail = operationDetail;
        this.preparationTime = preparationTime;
        this.gs = gs;
        this.rc = rc;
        this.observation = observation;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public long getIdOf() {
        return idOf;
    }

    public void setIdOf(long idOf) {
        this.idOf = idOf;
    }

    public long getIdWorkstation() {
        return idWorkstation;
    }

    public void setIdWorkstation(long idWorkstation) {
        this.idWorkstation = idWorkstation;
    }

    public long getIdArticle() {
        return idArticle;
    }

    public void setIdArticle(long idArticle) {
        this.idArticle = idArticle;
    }

    public List<Long> getIdsArticles() {
        return idsArticles;
    }

    public void setIdsArticles(List<Long> idsArticles) {
        this.idsArticles = idsArticles;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public Long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(Long executionTime) {
        this.executionTime = executionTime;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getOperationDetail() {
        return operationDetail;
    }

    public void setOperationDetail(String operationDetail) {
        this.operationDetail = operationDetail;
    }

    public Long getPreparationTime() {
        return preparationTime;
    }

    public void setPreparationTime(Long preparationTime) {
        this.preparationTime = preparationTime;
    }

    public String getGs() {
        return gs;
    }

    public void setGs(String gs) {
        this.gs = gs;
    }

    public String getRc() {
        return rc;
    }

    public void setRc(String rc) {
        this.rc = rc;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public List<SuiviOFTravailleur> getTravailleurs() {
        return travailleurs;
    }

    public void setTravailleurs(List<SuiviOFTravailleur> travailleurs) {
        this.travailleurs = travailleurs;
    }
}
