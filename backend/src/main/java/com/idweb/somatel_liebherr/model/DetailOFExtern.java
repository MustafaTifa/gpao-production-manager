package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "detail_article_extern")
public class DetailOFExtern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "article_of_id")
    private ArticleOFExtern articleOFExtern;

    @ManyToOne
    @JoinColumn(name = "article_id", referencedColumnName = "id", nullable = false)
    private Article article;

    @Column(length = 50)
    private int poids;

    @Column(length = 50)
    private int nbrTole;

    public DetailOFExtern() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ArticleOFExtern getArticleOFExtern() {
        return articleOFExtern;
    }

    public void setArticleOFExtern(ArticleOFExtern article) {
        this.articleOFExtern = article;
    }

    public int getPoids() {
        return poids;
    }

    public void setPoids(int poids) {
        this.poids = poids;
    }

    public int getNbrTole() {
        return nbrTole;
    }

    public void setNbrTole(int nbrTole) {
        this.nbrTole = nbrTole;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }
}
