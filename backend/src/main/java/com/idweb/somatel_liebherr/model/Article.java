package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "article")
@EntityListeners(AuditingEntityListener.class)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50,unique = true, nullable = false)
    private String identifiant;

    @Column(length = 50,unique = true)
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

    @Column(length = 50,columnDefinition = "INTEGER DEFAULT 0")
    private int facteurTaux;

    @Column(length = 50)
    private int version;

    @ManyToOne
    @JoinColumn(name="Id_type",nullable = false)
    private Type type;

    @ManyToOne(optional = true)
    @JoinColumn(name="Id_group",nullable = true)
    private Groupe groupe;

    @ManyToOne(optional = true)
    @JoinColumn(name="Id_sousgroup",nullable = true)
    private SousGroupe sousGroupe;

    @ManyToMany
    @JoinTable(
            name = "article_engin",
            joinColumns = @JoinColumn(name = "article_id"),
            inverseJoinColumns = @JoinColumn(name = "engin_id")
    )
    private List<Engin> engins;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<ArticleNomenclature> articleNomenclatures = new HashSet<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval= true)
    @JsonIgnore
    private Set<ArticleOFExtern> articleOFExterns = new HashSet<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private Set<ArticleGamme> articleGammes = new HashSet<>();

    @JsonIgnore
    @OneToOne(mappedBy = "article", cascade = CascadeType.ALL)
    private Nomenclature nomenclature;

    @JsonIgnore
    @OneToOne(mappedBy = "article")
    private OFIntern ofIntern;

    @Transient
    private TypeArticle typeArticle;

    @Transient
    private Long gammeId; // need it for filter in get gammes for an article

    @Transient
    private String operation; // need it for history table to ma actions is update or delete

    public TypeArticle getTypeArticle() {
        return typeArticle;
    }

    public void setTypeArticle(TypeArticle typeArticle) {
        this.typeArticle = typeArticle;
    }

    public Article() {
    }

    public Article(int typeArt, long id, String identifiant, String libelleFR) {
        this.typeArticle = typeArt == 0 ? TypeArticle.PARENT : TypeArticle.CHILD;
        Id = id;
        this.identifiant = identifiant;
        this.libelleFR = libelleFR;
    }

    public Article(int typeArt, long id, String identifiant, String libelleFR, Long gammeId) {
        this.typeArticle = typeArt == 0 ? TypeArticle.PARENT : TypeArticle.CHILD;
        Id = id;
        this.identifiant = identifiant;
        this.libelleFR = libelleFR;
        this.gammeId = gammeId;
    }

    public OFIntern getOfIntern() {
        return ofIntern;
    }

    public void setOfIntern(OFIntern ofIntern) {
        this.ofIntern = ofIntern;
    }

    public Nomenclature getNomenclature() {
        return nomenclature;
    }

    public void setNomenclature(Nomenclature nomenclature) {
        this.nomenclature = nomenclature;
    }

    public Set<ArticleNomenclature> getArticleNomenclatures() {
        return articleNomenclatures;
    }

    public void setArticleNomenclatures(Set<ArticleNomenclature> articleNomenclatures) {
        this.articleNomenclatures = articleNomenclatures;
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

    public int getFacteurTaux() {
        return facteurTaux;
    }

    public void setFacteurTaux(int facteurTaux) {
        this.facteurTaux = facteurTaux;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        System.out.println(version);
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

    public List<Engin> getEngins() {
        return engins;
    }

    public void setEngins(List<Engin> engins) {
        this.engins = engins;
    }

    public Set<ArticleGamme> getArticleGammes() {
        return articleGammes;
    }

    public void setArticleGammes(Set<ArticleGamme> articleGammes) {
        this.articleGammes = articleGammes;
    }

    public Long getGammeId() {
        return gammeId;
    }

    public void setGammeId(Long gammeId) {
        this.gammeId = gammeId;
    }

    public String getAction() {
        return operation;
    }

    public void setAction(String operation) {
        this.operation = operation;
    }

    public Set<ArticleOFExtern> getArticleOFExterns() {
        return articleOFExterns;
    }

    public void setArticleOFExterns(Set<ArticleOFExtern> articleOFExterns) {
        this.articleOFExterns = articleOFExterns;
    }
}
