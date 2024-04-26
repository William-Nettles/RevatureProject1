package com.revature.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.revature.daos.UserDAO;

@RestController
@RequestMapping("/users")
public class UserController {

    UserDAO userDAO;

    @Autowrired
    public userController(UserDAO userDAO){
        this.userDAO =userDAO
    }



}
