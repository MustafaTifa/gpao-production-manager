package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;

@Entity
@Table(name = "type")
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
    private String codeType;

    public Type() {
    }

    public Type(long id, String libelle, String observation,String codeType) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeType = codeType;
    }

    public long getId() {
        return Id;
    }

    public String getCodeType() {
        return codeType;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType;
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
        return "Type{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
