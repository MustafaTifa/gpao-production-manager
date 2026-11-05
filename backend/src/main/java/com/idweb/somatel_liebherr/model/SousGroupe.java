package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "sous_groupe")
@Getter
@Setter
public class SousGroupe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
    private String codeSousGroup;
    @ManyToOne(optional = true)
    @JoinColumn(name="Id_group",nullable = true)
    private Groupe groupe;

    public SousGroupe() {
    }

    public SousGroupe(long id, String libelle, String observation, String codeSousGroup, Groupe groupe) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeSousGroup = codeSousGroup;
        this.groupe = groupe;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getCodeSousGroup() {
        return codeSousGroup;
    }

    public void setCodeSousGroup(String codeSousGroup) {
        this.codeSousGroup = codeSousGroup;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    @Override
    public String toString() {
        return "Groupe{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
