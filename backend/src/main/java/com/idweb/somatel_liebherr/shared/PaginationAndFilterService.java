package com.idweb.somatel_liebherr.shared;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class PaginationAndFilterService<T> {

//        return new PageImpl<>(typedQuery.getResultList(),pageable,groupeCounts);
//    private long getTotalGroupes(Predicate predicate) {
//        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
//        Root<Groupe> root = criteriaQuery.from(Groupe.class);
//        criteriaQuery.select(criteriaBuilder.count(root)).where(predicate);
//        return entityManager.createQuery(criteriaQuery).getSingleResult();
//    }

    public Pageable getPagable(int Pagesize, int pageNumber, String sort) {
        Sort.Direction direction = sort.split(",")[1].equals("asc")? Sort.Direction.ASC : Sort.Direction.DESC;
        String sortBy = sort.split(",")[0];
        Sort sortPage = Sort.by(direction,sortBy);
        return PageRequest.of(pageNumber,Pagesize,sortPage);
    }

    public Specification<T> getSearchSpecification(List<String> filters){
        return (root, query, criteriaBuilder) -> criteriaBuilder.and(getPredicate(filters,root,criteriaBuilder).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicate(List<String> groupeSearchCriteria, Root<T> groupeRoot, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (Objects.nonNull(groupeSearchCriteria)){
            if(groupeSearchCriteria.size() == 3){
                String prop,value;

                value = groupeSearchCriteria.get(1);
                if(value.split("\\.").length > 1){
                    Join<Objects, Objects> filterJoin = groupeRoot.join(value.split("\\.")[0]);
                    if(groupeSearchCriteria.get(0).equalsIgnoreCase("eq")){
                        criteriaBuilder.equal(filterJoin.get(value.split("\\.")[1]),
                                groupeSearchCriteria.get(2));
                    } else if(groupeSearchCriteria.get(0).equalsIgnoreCase("noteq")){
                        criteriaBuilder.notEqual(filterJoin.get(value.split("\\.")[1]),
                                groupeSearchCriteria.get(2));
                    } else {
                        predicates.add(
                                criteriaBuilder.like(filterJoin.get(value.split("\\.")[1]),
                                        "%"+ groupeSearchCriteria.get(2)+"%"));
                    }

                } else {
                    if(groupeSearchCriteria.get(0).equalsIgnoreCase("eq")){
                        predicates.add(
                                criteriaBuilder.equal(groupeRoot.get(value),
                                        groupeSearchCriteria.get(2)));
                    } else if(groupeSearchCriteria.get(0).equalsIgnoreCase("noteq")){
                        predicates.add(
                                criteriaBuilder.notEqual(groupeRoot.get(value),
                                        groupeSearchCriteria.get(2)));
                    } else {
                        predicates.add(
                                criteriaBuilder.like(groupeRoot.get(value),
                                        "%"+ groupeSearchCriteria.get(2)+"%"));
                    }
                }
            }else{
                for (String criteria : groupeSearchCriteria){
                    String value;
                    String[] crt = criteria.split(",");
                    value = crt[1];
                    System.out.println("valueeeee : "+value+" ---- "+value.split("\\.").length);
                    if(value.split("\\.").length > 1){
                        System.out.println("valueeeee in dot: "+crt[0]);
                        Join<Objects, Objects> filterJoin = groupeRoot.join(value.split("\\.")[0]);
                        if(crt[0].equalsIgnoreCase("eq")){
                            predicates.add(
                                    criteriaBuilder.equal(filterJoin.get(value.split("\\.")[1]),
                                            crt[2]));
                        } else if(crt[0].equalsIgnoreCase("noteq")){
                            predicates.add(
                                    criteriaBuilder.notEqual(filterJoin.get(value.split("\\.")[1]),
                                            crt[2]));
                        } else {
                            predicates.add(
                                    criteriaBuilder.like(filterJoin.get(value.split("\\.")[1]),
                                            "%"+crt[2]+"%"));
                        }
                    } else {
                        System.out.println("valueeeee not in dout: "+value);
                        if(crt[0].equalsIgnoreCase("eq")){
                            predicates.add(
                                    criteriaBuilder.equal(groupeRoot.get(value),
                                            crt[2]));
                        } else if(crt[0].equalsIgnoreCase("noteq")){
                            predicates.add(
                                    criteriaBuilder.notEqual(groupeRoot.get(value),
                                            crt[2]));
                        } else {
                            predicates.add(
                                    criteriaBuilder.like(groupeRoot.get(value),
                                            "%"+crt[2]+"%"));
                        }
                    }
                }
            }
        }
        return predicates;
    }

}

