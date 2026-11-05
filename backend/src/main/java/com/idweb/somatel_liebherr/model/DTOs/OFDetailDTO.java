package com.idweb.somatel_liebherr.model.DTOs;

import com.idweb.somatel_liebherr.model.OFIntern;
import com.idweb.somatel_liebherr.model.SuiviOF;
import com.idweb.somatel_liebherr.model.Workstation;

import java.util.List;

public class OFDetailDTO {

    private OFIntern of;
    private Workstation posteDeTravail;
    private List<SuiviOF> suiviOf;

    public OFDetailDTO(OFIntern of, Workstation posteDeTravail, List<SuiviOF> suiviOf) {
        this.of = of;
        this.posteDeTravail = posteDeTravail;
        this.suiviOf = suiviOf;
    }

    public OFIntern getOf() {
        return of;
    }

    public void setOf(OFIntern of) {
        this.of = of;
    }

    public Workstation getPosteDeTravail() {
        return posteDeTravail;
    }

    public void setPosteDeTravail(Workstation posteDeTravail) {
        this.posteDeTravail = posteDeTravail;
    }

    public List<SuiviOF> getSuiviOf() {
        return suiviOf;
    }

    public void setSuiviOf(List<SuiviOF> suiviOf) {
        this.suiviOf = suiviOf;
    }
}
