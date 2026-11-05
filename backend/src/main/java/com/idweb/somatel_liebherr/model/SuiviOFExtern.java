package com.idweb.somatel_liebherr.model;

import com.idweb.somatel_liebherr.model.Enum.SuiviType;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "suivi_of_extern")
public class SuiviOFExtern {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne
    @JoinColumn(name = "of_extern_id", nullable = false)
    private OFExtern of;

    @Column(nullable = false,length = 50)
    private double quantity;

    @Column(length = 50)
    private Long id_arcticle_ass;

    @Column(length = 50)
    private String bonDeLivraison;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String suiviType;

    public SuiviOFExtern() {
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public OFExtern getOf() {
        return of;
    }

    public void setOf(OFExtern of) {
        this.of = of;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Long getId_arcticle_ass() {
        return id_arcticle_ass;
    }

    public void setId_arcticle_ass(Long id_arcticle_ass) {
        this.id_arcticle_ass = id_arcticle_ass;
    }
    
    public String getBonDeLivraison() {
        return bonDeLivraison;
    }

    public void setBonDeLivraison(String bonDeLivraison) {
        this.bonDeLivraison = bonDeLivraison;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getSuiviType() {
        return suiviType;
    }

    public void setSuiviType(String suiviType) {
        this.suiviType = suiviType;
    }
}
