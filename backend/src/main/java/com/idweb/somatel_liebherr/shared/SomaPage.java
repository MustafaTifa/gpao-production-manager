package com.idweb.somatel_liebherr.shared;

import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class SomaPage {
    private int pageNumber = 0;
    private int pageSize = 10;
    private Sort.Direction direction = Sort.Direction.DESC;
    private String sortBy = "Id,desc";
    private List<String> filters = new ArrayList<>();

    public SomaPage() {
    }

    public SomaPage(int pageNumber, int pageSize, Sort.Direction direction, String sortBy, List<String> filters) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.direction = direction;
        this.sortBy = sortBy;
        this.filters = filters;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Sort.Direction getDirection() {
        return direction;
    }

    public void setDirection(Sort.Direction direction) {
        this.direction = direction;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public List<String> getFilters() {
        return filters;
    }

    public void setFilters(List<String> filters) {
        this.filters = filters;
    }

    @Override
    public String toString() {
        return "SomaPage{" +
                "pageNumber=" + pageNumber +
                ", pageSize=" + pageSize +
                ", direction=" + direction +
                ", sortBy='" + sortBy + '\'' +
                '}';
    }

}
