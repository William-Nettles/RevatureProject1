package com.revature.service;

import com.revature.daos.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {

    UserDAO userDAO;

    @Autowired
    public UserService() {
    }
}
