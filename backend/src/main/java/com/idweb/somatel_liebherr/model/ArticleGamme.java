package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.idweb.somatel_liebherr.model.Enum.TypeArticle;
import jakarta.persistence.*;

@Entity
@Table(name = "article_gamme")
public class ArticleGamme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    @JsonIgnore
    private Article article;

    @ManyToOne
    @JoinColumn(name = "gamme_id")
    @JsonIgnore
    private Gamme gamme;

    @Enumerated(EnumType.ORDINAL)
    private TypeArticle type;

    public ArticleGamme() {
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

    public Gamme getGamme() {
        return gamme;
    }

    public void setGamme(Gamme gamme) {
        this.gamme = gamme;
    }

    public TypeArticle getType() {
        return type;
    }

    public void setType(TypeArticle type) {
        this.type = type;
    }
}
