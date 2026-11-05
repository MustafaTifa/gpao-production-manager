package com.idweb.somatel_liebherr.repository;

import com.idweb.somatel_liebherr.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TypeRepository extends JpaRepository<Type, Long>, JpaSpecificationExecutor<Type> {
}
