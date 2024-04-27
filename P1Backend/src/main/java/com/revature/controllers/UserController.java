package com.revature.controllers;

import com.revature.daos.ReimbursementDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.daos.UserDAO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    UserDAO userDAO;

    @Autowired
    public UserController(UserDAO userDAO){
        this.userDAO =userDAO;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.status(201).body(userDAO.save(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User>users = userDAO.findAll();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/userId")
    public ResponseEntity<Object> deleteUser(@PathVariable int userId){
        Optional<User> u = userDAO.findById(userId);

        if(u.isEmpty()){
            return ResponseEntity.status(404).body("UserId not found");
        }
        User user = u.get();
        userDAO.deleteById(userId);

        return ResponseEntity.accepted().body("user deleted");
    }
}
