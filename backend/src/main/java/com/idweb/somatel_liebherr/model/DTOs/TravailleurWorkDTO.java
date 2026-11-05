package com.idweb.somatel_liebherr.model.DTOs;

public class TravailleurWorkDTO {

    private String numberOF;
    private String operation;
    private Long travailleurId;
    private String travailleurLibelle;
    private String workstationLibelle;
    private Long totalTempEffectif;

    public TravailleurWorkDTO() {
    }

    public TravailleurWorkDTO(String numberOF, String operation, Long travailleurId,
                              String travailleurLibelle, String workstationLibelle, Long totalTempEffectif) {
        this.numberOF = numberOF;
        this.operation = operation;
        this.travailleurId = travailleurId;
        this.travailleurLibelle = travailleurLibelle;
        this.workstationLibelle = workstationLibelle;
        this.totalTempEffectif = totalTempEffectif;
    }

    public String getNumberOF() {
        return numberOF;
    }

    public void setNumberOF(String numberOF) {
        this.numberOF = numberOF;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Long getTravailleurId() {
        return travailleurId;
    }

    public void setTravailleurId(Long travailleurId) {
        this.travailleurId = travailleurId;
    }

    public String getTravailleurLibelle() {
        return travailleurLibelle;
    }

    public void setTravailleurLibelle(String travailleurLibelle) {
        this.travailleurLibelle = travailleurLibelle;
    }

    public String getWorkstationLibelle() {
        return workstationLibelle;
    }

    public void setWorkstationLibelle(String workstationLibelle) {
        this.workstationLibelle = workstationLibelle;
    }

    public Long getTotalTempEffectif() {
        return totalTempEffectif;
    }

    public void setTotalTempEffectif(Long totalTempEffectif) {
        this.totalTempEffectif = totalTempEffectif;
    }
}
