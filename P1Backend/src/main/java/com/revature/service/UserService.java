package com.revature.service;

import com.revature.daos.UserDAO;
import com.revature.models.DTOs.IncomingUserDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }


    //createUser
    public User createUser(IncomingUserDTO userDTO) throws IllegalArgumentException {

        if (userDTO.getUsername().isBlank() || userDTO.getUsername() == null) {
            throw new IllegalArgumentException("Username cannot be empty");
        }

        if (userDTO.getPassword().isBlank() || userDTO.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        //vulgar check
        if (userDTO.getUsername().equals("JavaScript")) {
            throw new IllegalArgumentException("Username cannot be JavaScript");
        }

        User newU = new User(userDTO.getUsername(), userDTO.getPassword());

        return userDAO.save(newU);

    }

    public List<OutgoingUserDTO> getAllUser(int userId) {

        List<User> allUsers = userDAO.findAll();

        List<OutgoingUserDTO> usersOut = new ArrayList<>();

        for (User u : allUsers) {
            OutgoingUserDTO uOut = new OutgoingUserDTO(
                    u.getUserId(),
                    u.getFirstName(),
                    u.getLastName(),
                    u.getUsername(),
                    u.getRole()
            );
            usersOut.add(uOut);
        }
        return usersOut;
    }

    public ResponseEntity<List<User>> getAllUsers(){
        List<User>users = userDAO.findAll();
        return ResponseEntity.ok(users);
    }


    public ResponseEntity<Object> deleteUser(int userId){
        Optional<User> userOptional = userDAO.findById(userId);

        if(userOptional.isEmpty()){
            return ResponseEntity.status(404).body("User with ID " + userId + " not found");
        }
        User user = userOptional.get();
        userDAO.deleteById(userId);

        return ResponseEntity.accepted().body("user deleted");
    }


}
