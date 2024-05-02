package com.revature.controllers;

import com.revature.daos.ReimbursementDAO;
import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.daos.UserDAO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    UserService userService;
    UserDAO userDAO; // Inject UserDAO


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody IncomingUserDTO userDTO) {

        try{
            userService.createUser(userDTO);
            return ResponseEntity.status(201).body(userDTO.getUsername() + " was created");
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(HttpSession session){
        if (session.getAttribute((String) session.getAttribute("role")).equals("USER")) {
            return ResponseEntity.status(401).body("You must be logged in as a manager to look up users");
        }

        int userId = (int)session.getAttribute("userId");

        return ResponseEntity.ok(userService.getAllUser(userId));
    }


    @DeleteMapping("/userId")
    public ResponseEntity<String>deleteUser(@PathVariable int userId, HttpSession session){
       String userRole =(String) session.getAttribute("role");

        // Check if user is a manager
        if (!"MANAGER".equals(userRole)) {
            return ResponseEntity.status(401).body("You must be logged in as a manager to delete users");
        }

        //get user to be deleted
        Optional<User> userOptional = userDAO.findById(userId);
        if(userOptional.isEmpty()){
            return ResponseEntity.status(404).body("user not found");
        }
        User u = userOptional.get();
        String userOut = u.getRole();

        //A manager should NOT be able to delete another mananger
        if("MANAGER".equals(userOut)){
            return ResponseEntity.status(403).body("You cannot delete a MANAGER");
        }
        try{
            userDAO.deleteById(userId);
            return ResponseEntity.accepted().body("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete user");
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUserRole(@PathVariable int userId, @RequestBody String newRole, HttpSession session) {
        String userRole = (String) session.getAttribute("role");

        // Check if user is a manager
        if (!"MANAGER".equals(userRole)) {
            return ResponseEntity.status(401).body("You must be logged in as a manager to update user roles");
        }

        if(!"MANAGER".equals(newRole)){
            return ResponseEntity.status(400).body("Invalid role:" + newRole + " .Only 'MANAGER' role can be assigned.");
        }

        try{
            userService.updateUserRole(userId,newRole);
            return ResponseEntity.ok().body( userId + " Promoted successfully");
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Update user");
        }
    }
}
