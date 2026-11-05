package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table(name = "of_intern")
public class OFIntern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50,unique = true, nullable = false)
    private String numberOF;

    @Column(length = 50, nullable = false)
    private Date date;

    @Column(nullable = false,length = 50)
    private int quantity;

    @Column(nullable = false,length = 50)
    private int delai;

    @Column(length = 50)
    private String bonDeCommande;

    @Column(length = 50)
    private String observation;

    @Column(length = 100)
    private String projectOf;

    @Column(length = 50)
    private String rc;

    @OneToOne
    @JoinColumn(name = "article_id", referencedColumnName = "id", nullable = false)
    private Article article;

    public OFIntern() {
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getNumberOF() {
        return numberOF;
    }

    public void setNumberOF(String numberOF) {
        this.numberOF = numberOF;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getDelai() {
        return delai;
    }

    public void setDelai(int delai) {
        this.delai = delai;
    }

    public String getBonDeCommande() {
        return bonDeCommande;
    }

    public void setBonDeCommande(String bonDeCommande) {
        this.bonDeCommande = bonDeCommande;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public String getProjectOf() {
        return projectOf;
    }

    public void setProjectOf(String projectOf) {
        this.projectOf = projectOf;
    }

    public String getRc() {
        return rc;
    }

    public void setRc(String rc) {
        this.rc = rc;
    }
}
