package com.revature.P1Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EntityScan("com.revature.models") //This is telling Spring to look for DB entities here
@ComponentScan("com.revature") //Spring will look for Beans within com.revature (and its subpackages)
@EnableJpaRepositories("com.revature.daos")
@CrossOrigin
public class P1BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(P1BackendApplication.class, args);
	}

}
