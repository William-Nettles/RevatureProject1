package com.revature.service;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;


public class UserService {

    UserDAO userDAO;

    @Autowired
    public UserService() {
    }


    public ResponseEntity<User> createUser(User user) {
        return ResponseEntity.status(201).body(userDAO.save(user));
    }


    public ResponseEntity<List<User>> getAllUsers(){
        List<User>users = userDAO.findAll();
        return ResponseEntity.ok(users);
    }


    public ResponseEntity<Object> deleteUser(int userId){
        Optional<User> u = userDAO.findById(userId);

        if(u.isEmpty()){
            return ResponseEntity.status(404).body("UserId not found");
        }
        User user = u.get();
        userDAO.deleteById(userId);

        return ResponseEntity.accepted().body("user deleted");
    }

}
