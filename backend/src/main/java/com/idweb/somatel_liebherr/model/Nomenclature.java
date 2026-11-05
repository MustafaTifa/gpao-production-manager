package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.*;

@Entity
@Table(name = "nomenclature")
@EntityListeners(AuditingEntityListener.class)
public class Nomenclature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

//    @Column(length = 200)
//    private String observation;

//    @Column(nullable = false,length = 50)
//    private int quantity;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

    @OneToMany(mappedBy = "nomenclature", cascade = CascadeType.ALL, orphanRemoval= true)
    @JsonIgnore
    private Set<ArticleNomenclature> articleNomenclatures = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "article_id", referencedColumnName = "id", nullable = false)
    private Article article;

    public Nomenclature() {
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
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

//    public String getObservation() {
//        return observation;
//    }
//
//    public void setObservation(String observation) {
//        this.observation = observation;
//    }
//
//    public int getQuantity() {
//        return quantity;
//    }
//
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }

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

}
