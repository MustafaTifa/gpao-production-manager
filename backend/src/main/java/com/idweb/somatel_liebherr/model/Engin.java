package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "engin")
public class Engin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
    private String codeEngin;
    @ManyToMany(mappedBy = "engins")
    private List<Article> articles;

    public Engin() {
    }

    public Engin(long id, String libelle, String observation,String codeEngin) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeEngin = codeEngin;
    }

    public long getId() {
        return Id;
    }

    public String getCodeEngin() {
        return codeEngin;
    }

    public void setCodeEngin(String codeEngin) {
        this.codeEngin = codeEngin;
    }

    public String getLibelle() {
        return libelle;
    }

    public String getObservation() {
        return observation;
    }

    public void setId(long id) {
        Id = id;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    @Override
    public String toString() {
        return "Engin{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
