package com.revature.service;

import com.revature.daos.ReimbursementDAO;
import com.revature.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class ReimbursementService {

    ReimbursementDAO reimDAO;

    @Autowired
    public ReimbursementService() {

    }

    public ResponseEntity<Object> createReimbursement(Reimbursement reimbursement) {
        //TODO: add error handling logic
        return ResponseEntity.status(201).body(reimDAO.save(reimbursement));
    }

    public ResponseEntity<List<Reimbursement>> getAllReims() {
        //TODO: if user return only user's, if manager, return all
        return ResponseEntity.ok(reimDAO.findAll());
    }

    public ResponseEntity<List<Reimbursement>> getAllPending() {
        return ResponseEntity.ok(reimDAO.findAll().stream().filter((reim)->{return reim.getStatus()==0;}).toList());
    }


    public ResponseEntity<Object> updateStatus(int reimId, int status) {
        Optional<Reimbursement> rb = reimDAO.findById(reimId);
        if (rb.isEmpty())
            return ResponseEntity.badRequest().body("No Reimbursement with Id: " + reimId +" found");
        Reimbursement reimbursement = rb.get();
        reimbursement.setStatus(status);
        return ResponseEntity.ok(reimDAO.save(reimbursement));
    }
}
