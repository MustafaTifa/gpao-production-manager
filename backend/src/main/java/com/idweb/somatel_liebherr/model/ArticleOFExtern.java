package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "article_extern")
@EntityListeners(AuditingEntityListener.class)
public class ArticleOFExtern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 50)
    private double quantity;

    @OneToMany(mappedBy = "articleOFExtern", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetailOFExtern> details = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "ofExtern_id")
    private OFExtern ofExtern;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

    public ArticleOFExtern() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public OFExtern getOfExtern() {
        return ofExtern;
    }

    public void setOfExtern(OFExtern ofExtern) {
        this.ofExtern = ofExtern;
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

    public List<DetailOFExtern> getDetails() {
        return details;
    }

//    public void setDetails(List<DetailOFExtern> details) {
//        this.details = details;
//    }

    public void setDetails(List<DetailOFExtern> details) {
        this.details = new ArrayList<>();
        if (details != null) {
            for (DetailOFExtern detail : details) {
                addDetail(detail); // 👈 sets the parent on each child
            }
        }
    }

    public void addDetail(DetailOFExtern detail) {
        detail.setArticleOFExtern(this); // 👈 this is crucial
        this.details.add(detail);
    }
//    public void setDetails(List<DetailOFExtern> details) {
//        this.details.clear();
//        if (details != null) {
//            for (DetailOFExtern detail : details) {
//                addDetail(detail);
//            }
//        }
//    }
//
//    public void addDetail(DetailOFExtern detail) {
//        detail.setArticleOFExtern(this);
//        this.details.add(detail);
//    }
}
