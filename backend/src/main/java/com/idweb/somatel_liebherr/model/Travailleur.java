package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
        import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "travailleur")
@Getter
@Setter
public class Travailleur {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50)
    private String libelle;

    @Column(length = 50)
    private String observation;

    @Column(length = 50,unique = true, nullable = false)
    private String codeTravailleur;

    @ManyToOne
    @JoinColumn(name="Id_workstation",nullable = false)
    private Workstation workstation;

    public Travailleur() {
    }

    public Travailleur(long id, String libelle, String observation, String codeTravailleur, Workstation workstation) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeTravailleur = codeTravailleur;
        this.workstation = workstation;
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

    public String getCodeTravailleur() {
        return codeTravailleur;
    }

    public void setCodeTravailleur(String codeTravailleur) {
        this.codeTravailleur = codeTravailleur;
    }

    public Workstation getWorkstation() {
        return workstation;
    }

    public void setWorkstation(Workstation workstation) {
        this.workstation = workstation;
    }

    @Override
    public String toString() {
        return "Travailleur{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
