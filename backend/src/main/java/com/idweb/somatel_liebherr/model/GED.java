package com.idweb.somatel_liebherr.model;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Entity
@Table(name = "ged")
@EntityListeners(AuditingEntityListener.class)
public class GED {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(length = 50)
    private String libelle;

    @Column(length = 50)
    private String observation;

    @Column(length = 150)
    private String fileName;

    @Column(length = 150)
    private String fileNameINDataBsae;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private Date createDate;

    @LastModifiedDate
    @Column(insertable = false)
    private Date lastModified;

    @Column(length = 50)
    private int version;

//    @Transient
//    private MultipartFile file;

    @ManyToOne
    @JoinColumn(name="Id_article",nullable = false)
    private Article article;

    public GED() {
    }

    public GED(String fileName, String libelle, String observation) {
        this.fileName = fileName;
        this.libelle = libelle;
        this.observation = observation;
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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public String getFileNameINDataBsae() {
        return fileNameINDataBsae;
    }

    public void setFileNameINDataBsae(String fileNameINDataBsae) {
        this.fileNameINDataBsae = fileNameINDataBsae;
    }

//    public MultipartFile getFile() {
//        return file;
//    }
//
//    public void setFile(MultipartFile file) {
//        this.file = file;
//    }
}
