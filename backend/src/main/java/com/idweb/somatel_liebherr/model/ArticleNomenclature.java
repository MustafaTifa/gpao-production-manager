package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.idweb.somatel_liebherr.model.Enum.TypeArticle;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table(name = "article_nomenclature")
@EntityListeners(AuditingEntityListener.class)
public class ArticleNomenclature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String observation;

    @Column(nullable = false,length = 50)
    private double quantity;

    @Column(nullable = false)
    private String pos;

    @ManyToOne
    @JoinColumn(name = "article_id")
//    @JsonIgnore
    private Article article;

    @ManyToOne
    @JoinColumn(name = "nomenclature_id")
//    @JsonIgnore
    private Nomenclature nomenclature;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

    @Enumerated(EnumType.ORDINAL)
    private TypeArticle type;

    public ArticleNomenclature() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Nomenclature getNomenclature() {
        return nomenclature;
    }

    public void setNomenclature(Nomenclature nomenclature) {
        this.nomenclature = nomenclature;
    }

    public TypeArticle getType() {
        return type;
    }

    public void setType(TypeArticle type) {
        this.type = type;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
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

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }
}
