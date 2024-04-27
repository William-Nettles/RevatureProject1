package com.revature.service;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class ReimbursementService {

    ReimbursementDAO reimDAO;
    UserDAO userDAO;

    @Autowired
    public ReimbursementService() {

    }

    public ResponseEntity<Object> createReimbursement(Reimbursement reimbursement) {
        return ResponseEntity.status(201).body(reimDAO.save(reimbursement));
    }

    public ResponseEntity<List<Reimbursement>> getAllReims(int userId) {
        Optional<User> user = userDAO.findById(userId);
        List<Reimbursement> rb = reimDAO.findAllByUserId(userId);
        if (user.isEmpty() || user.get().getRole().equals("USER"))
            return ResponseEntity.ok().body(rb);

        return ResponseEntity.ok(reimDAO.findAll());
    }

    public ResponseEntity<List<Reimbursement>> getAllPending(int userId) {
        return ResponseEntity.ok(reimDAO.findAll().stream().filter((reim)->{return reim.getStatus()==0;}).toList());
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
