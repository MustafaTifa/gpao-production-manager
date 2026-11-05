package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "of_extern")
public class OFExtern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50,unique = true, nullable = false)
    private String numberOF;

    @Column(length = 50, nullable = false)
    private Date date;

    @Column(nullable = false,length = 50)
    private int delai;

    @Column(length = 50)
    private String bonDeCommande;

    @Column(length = 50)
    private String observation;

    @OneToMany(mappedBy = "ofExtern", cascade = CascadeType.ALL, orphanRemoval= true)
    @JsonIgnore
    private Set<ArticleOFExtern> articleOFExterns = new HashSet<>();

    public OFExtern() {
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

    public Set<ArticleOFExtern> getArticleOFExterns() {
        return articleOFExterns;
    }

    public void setArticleOFExterns(Set<ArticleOFExtern> articleOFExterns) {
        this.articleOFExterns = articleOFExterns;
    }
}
