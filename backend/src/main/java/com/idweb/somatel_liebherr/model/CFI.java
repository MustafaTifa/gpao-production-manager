package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cfi")
public class CFI {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
    private String codeCFI;

    public CFI() {
    }

    public CFI(long id, String libelle, String observation,String codeCFI) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeCFI = codeCFI;
    }

    public long getId() {
        return Id;
    }

    public String getCodeCFI() {
        return codeCFI;
    }

    public void setCodeCFI(String codeCFI) {
        this.codeCFI = codeCFI;
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
        return "CFI{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
