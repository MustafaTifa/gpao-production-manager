package com.idweb.somatel_liebherr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing
public class SomatelLiebherrApplication {

	public static void main(String[] args) {
		SpringApplication.run(SomatelLiebherrApplication.class, args);
	}

}
