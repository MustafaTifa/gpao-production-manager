package com.idweb.somatel_liebherr.model.DTOs;

import com.idweb.somatel_liebherr.model.*;
import com.idweb.somatel_liebherr.model.Enum.TypeArticle;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "article_historique")
@EntityListeners(AuditingEntityListener.class)
public class ArticleHistoryDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50, nullable = false)
    private Long articleId;

    @Column(length = 50,unique = true, nullable = false)
    private String identifiant;

    @Column(length = 50,unique = true, nullable = false)
    private String identifiantSomatel;

    @Column(length = 50)
    private String libelleFR;

    @Column(length = 50)
    private String libelleEN;

    @Column(length = 50)
    private String libelleGER;

    @Column(length = 50)
    private String fournisseurREF;

    @Column(length = 200)
    private String observation;

    @Column(length = 50)
    private String numberDessin;

    @Column(length = 50)
    private String nature;

    @Column(length = 50)
    private String sortieUnit;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

    @ManyToOne
    @JoinColumn(name="Id_type",nullable = false)
    private Type type;

    @ManyToOne
    @JoinColumn(name="Id_group",nullable = false)
    private Groupe groupe;

    @ManyToOne
    @JoinColumn(name="Id_sousgroup",nullable = false)
    private SousGroupe sousGroupe;

    @Transient
    private TypeArticle typeArticle;

    @Transient
    private Long gammeId; // need it for filter in get gammes for an article

    @Column
    private String operation; // need it for history table to ma operation is update or delete

    public TypeArticle getTypeArticle() {
        return typeArticle;
    }

    public void setTypeArticle(TypeArticle typeArticle) {
        this.typeArticle = typeArticle;
    }

    public ArticleHistoryDTO() {
    }

    public ArticleHistoryDTO(int typeArt, long id, String identifiant, String libelleFR) {
        this.typeArticle = typeArt == 0 ? TypeArticle.PARENT : TypeArticle.CHILD;
        Id = id;
        this.identifiant = identifiant;
        this.libelleFR = libelleFR;
    }

    public ArticleHistoryDTO(int typeArt, long id, String identifiant, String libelleFR, Long gammeId) {
        this.typeArticle = typeArt == 0 ? TypeArticle.PARENT : TypeArticle.CHILD;
        Id = id;
        this.identifiant = identifiant;
        this.libelleFR = libelleFR;
        this.gammeId = gammeId;
    }

    public ArticleHistoryDTO(long id,long articleId, String identifiant, String identifiantSomatel, String libelleFR, String libelleEN, String libelleGER, String fournisseurREF, String observation, String numberDessin, String nature, String sortieUnit, Date createDate, Date lastModified, int version, Type type, Groupe groupe, SousGroupe sousGroupe, TypeArticle typeArticle, Long gammeId, String operation) {
        Id = id;
        this.articleId = articleId;
        this.identifiant = identifiant;
        this.identifiantSomatel = identifiantSomatel;
        this.libelleFR = libelleFR;
        this.libelleEN = libelleEN;
        this.libelleGER = libelleGER;
        this.fournisseurREF = fournisseurREF;
        this.observation = observation;
        this.numberDessin = numberDessin;
        this.nature = nature;
        this.sortieUnit = sortieUnit;
        this.createDate = createDate;
        this.lastModified = lastModified;
        this.version = version;
        this.type = type;
        this.groupe = groupe;
        this.sousGroupe = sousGroupe;
        this.typeArticle = typeArticle;
        this.gammeId = gammeId;
        this.operation = operation;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getIdentifiant() {
        return identifiant;
    }

    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }

    public String getIdentifiantSomatel() {
        return identifiantSomatel;
    }

    public void setIdentifiantSomatel(String identifiantSomatel) {
        this.identifiantSomatel = identifiantSomatel;
    }

    public String getLibelleFR() {
        return libelleFR;
    }

    public void setLibelleFR(String libelleFR) {
        this.libelleFR = libelleFR;
    }

    public String getLibelleEN() {
        return libelleEN;
    }

    public void setLibelleEN(String libelleEN) {
        this.libelleEN = libelleEN;
    }

    public String getLibelleGER() {
        return libelleGER;
    }

    public void setLibelleGER(String libelleGER) {
        this.libelleGER = libelleGER;
    }

    public String getFournisseurREF() {
        return fournisseurREF;
    }

    public void setFournisseurREF(String fournisseurREF) {
        this.fournisseurREF = fournisseurREF;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getNumberDessin() {
        return numberDessin;
    }

    public void setNumberDessin(String numberDessin) {
        this.numberDessin = numberDessin;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public String getSortieUnit() {
        return sortieUnit;
    }

    public void setSortieUnit(String sortieUnit) {
        this.sortieUnit = sortieUnit;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    public SousGroupe getSousGroupe() {
        return sousGroupe;
    }

    public void setSousGroupe(SousGroupe sousGroupe) {
        this.sousGroupe = sousGroupe;
    }

    public Long getGammeId() {
        return gammeId;
    }

    public void setGammeId(Long gammeId) {
        this.gammeId = gammeId;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
}
