package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "groupe")
@Getter
@Setter
public class Groupe {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private long Id;
    @Column(length = 50)
    private String libelle;
    @Column(length = 50)
    private String observation;
    @Column(length = 50,unique = true, nullable = false)
//    @Column(unique = true)
    private String codeGroup;

    public Groupe() {
    }

    public Groupe(long id, String libelle, String observation,String codeGroup) {
        Id = id;
        this.libelle = libelle;
        this.observation = observation;
        this.codeGroup = codeGroup;
    }

    public long getId() {
        return Id;
    }

    public String getCodeGroup() {
        return codeGroup;
    }

    public void setCodeGroup(String codeGroup) {
        this.codeGroup = codeGroup;
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
        return "Groupe{" +
                "Id=" + Id +
                ", libelle='" + libelle + '\'' +
                ", observation='" + observation + '\'' +
                '}';
    }
}
