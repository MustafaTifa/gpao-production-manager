package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.*;

@Entity
@Table(name = "gamme")
@EntityListeners(AuditingEntityListener.class)
public class Gamme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

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

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

    @Column(length = 50)
    private String rc;

    @Column(length = 200)
    private String observation;

    @ManyToOne
    @JoinColumn(name="Id_workstation",nullable = false)
    private Workstation workstation;

    @OneToMany(mappedBy = "gamme", cascade = CascadeType.ALL, orphanRemoval= true)
    private Set<ArticleGamme> articleGammes = new HashSet<>();

    @Transient
    private List<Article> articles = new ArrayList<>();

    public Gamme() {
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Workstation getWorkstation() {
        return workstation;
    }

    public void setWorkstation(Workstation workstation) {
        this.workstation = workstation;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }

    public Set<ArticleGamme> getArticleGammes() {
        return articleGammes;
    }

    public void setArticleGammes(Set<ArticleGamme> articleGammes) {
        this.articleGammes = articleGammes;
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

    public Gamme(long id, String pos, String operation, Long executionTime, Date lastModified, int version, Workstation workstation, List<Article> articles, String rc, String observation, String operationDetail, Long preparationTime, String gs) {
        Id = id;
        this.pos = pos;
        this.executionTime = executionTime;
        this.operation = operation;
        this.lastModified = lastModified;
        this.version = version;
        this.workstation = workstation;
        this.articles = articles;
        this.rc = rc;
        this.observation = observation;
        this.operationDetail = operationDetail;
        this.preparationTime = preparationTime;
        this.gs = gs;
    }
}
