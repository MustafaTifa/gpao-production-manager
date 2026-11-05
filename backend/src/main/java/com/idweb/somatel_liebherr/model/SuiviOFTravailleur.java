package com.idweb.somatel_liebherr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "suivi_of_travailleur")
public class SuiviOFTravailleur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "suivi_of_id", nullable = false)
    @JsonIgnore
    private SuiviOF suiviOf;

    @ManyToOne
    @JoinColumn(name = "travailleur_id", nullable = false)
    private Travailleur travailleur;

    @Column(nullable = false)
    private int quantite;

    @Column(nullable = false)
    private Long tempEffectif;

    public SuiviOFTravailleur() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SuiviOF getSuiviOf() {
        return suiviOf;
    }

    public void setSuiviOf(SuiviOF suiviOf) {
        this.suiviOf = suiviOf;
    }

    public Travailleur getTravailleur() {
        return travailleur;
    }

    public void setTravailleur(Travailleur travailleur) {
        this.travailleur = travailleur;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public Long getTempEffectif() {
        return tempEffectif;
    }

    public void setTempEffectif(Long tempEffectif) {
        this.tempEffectif = tempEffectif;
    }
}
