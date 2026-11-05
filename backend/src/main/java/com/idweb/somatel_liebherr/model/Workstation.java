package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workstation")
public class Workstation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
    private String codeWorkstation;

    @ManyToOne
    @JoinColumn(name = "cfi_id", nullable = false)
    private CFI cfi;

    public Workstation() {
    }

    public Workstation(long id, String libelle, String observation,String codeWorkstation) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeWorkstation = codeWorkstation;
    }

    public Workstation(long id, String libelle, String codeWorkstation) {
        Id = id;
        this.libelle = libelle;
        this.codeWorkstation = codeWorkstation;
    }

    public long getId() {
        return Id;
    }

    public String getCodeWorkstation() {
        return codeWorkstation;
    }

    public void setCodeWorkstation(String codeWorkstation) {
        this.codeWorkstation = codeWorkstation;
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

    public CFI getCfi() {
        return cfi;
    }

    public void setCfi(CFI cfi) {
        this.cfi = cfi;
    }

    @Override
    public String toString() {
        return "Workstation{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
