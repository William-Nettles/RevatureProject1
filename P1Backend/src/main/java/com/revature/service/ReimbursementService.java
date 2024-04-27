package com.revature.service;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ReimbursementService {

    ReimbursementDAO reimDAO;
    UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimDAO, UserDAO userDAO) {
        this.reimDAO=reimDAO;
        this.userDAO=userDAO;
    }

    public ResponseEntity<Object> createReimbursement(Reimbursement reimbursement, int userId) {
        Optional<User> user = userDAO.findById(userId);
        if (user.isEmpty())
            return ResponseEntity.badRequest().body("No user with Id: " + userId);
        reimbursement.setUser(user.get());
        return ResponseEntity.status(201).body(reimDAO.save(reimbursement));
    }

    public ResponseEntity<List<Reimbursement>> getAllReims(int userId) {
        Optional<User> user = userDAO.findById(userId);
        List<Reimbursement> rb = reimDAO.findAll();
        if (user.isPresent() && user.get().getRole().equals("MANAGER"))
            return ResponseEntity.ok().body(rb);
        else if (user.isPresent() && user.get().getRole().equals("USER")) {
            final int ID=user.get().getUserId();
            return ResponseEntity.ok(rb.stream().filter((reim)-> reim.getUser().getUserId()==ID).toList());
        }

        return ResponseEntity.ok(new ArrayList<>());
    }

    public ResponseEntity<List<Reimbursement>> getAllPending(int userId) {
        List<Reimbursement> allPending = reimDAO.findAllByStatus(0);
        Optional<User> user = userDAO.findById(userId);
        if (user.isPresent() && user.get().getRole().equals("MANAGER"))
            return ResponseEntity.ok(allPending);
        else if (user.isPresent() && user.get().getRole().equals("USER")) {
            return ResponseEntity.ok(allPending.stream()
                    .filter((r)->r.getUser().getUserId()==user.get().getUserId()).toList());
        }

        return ResponseEntity.ok(new ArrayList<>());
    }


    public ResponseEntity<Object> updateStatus(int reimId, int status) {
        Optional<Reimbursement> rb = reimDAO.findById(reimId);
        if (rb.isEmpty())
            return ResponseEntity.badRequest().body("No Reimbursement with Id: " + reimId +" found");
        Reimbursement reimbursement = rb.get();
        reimbursement.setStatus(status);
        return ResponseEntity.accepted().body(reimDAO.save(reimbursement));
    }

    public ResponseEntity<Object> updateDescription(int reimId, String desc) {

        Optional<Reimbursement> rb = reimDAO.findById(reimId);
        if (rb.isEmpty())
            return ResponseEntity.badRequest().body("No Reimbursement with Id: " + reimId +" found");
        Reimbursement reimbursement = rb.get();
        reimbursement.setDescription(desc);
        return ResponseEntity.accepted().body(reimDAO.save(reimbursement));
    }
}
