package com.revature.controllers;

import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.service.ReimbursementService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReimbursementController {

    ReimbursementService reimServ;

    @Autowired
    public ReimbursementController(ReimbursementService reimServ) { this.reimServ = reimServ;}

    @PostMapping()
    public ResponseEntity<String> createNewReimbursement(@RequestBody ReimbursementDTO reimDTO, HttpSession session) {
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to create a reimbursement");
        }
        try {
            Reimbursement reimbursement = reimServ.createReimbursement(reimDTO, (int) session.getAttribute("userId"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
        return ResponseEntity.status(201).body("Reimbursement Created.");
    }

    @GetMapping
    public ResponseEntity<?> getAllReimbursements(HttpSession session) {
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to view reimbursements");
        }
        return ResponseEntity.ok(reimServ.getAllReims((int) session.getAttribute("userId")));
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReimbursements(HttpSession session) {
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(401).body("You must be logged in to view reimbursements");
        }
        return ResponseEntity.ok(reimServ.getAllPending((int) session.getAttribute("userId")));
    }

    @PutMapping("/status/{reimId}")
    public ResponseEntity<Object> updateReimbursementStatus(@PathVariable int reimId, @RequestBody int status, HttpSession session) {
        if (((String) session.getAttribute("role")).equals("USER"))
            return ResponseEntity.status(401).body("You must be logged in as a manager to change status");
        try {
            return ResponseEntity.accepted().body(reimServ.updateStatus(reimId, status));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PutMapping("/description/{reimId}")
    public  ResponseEntity<Object> updateReimbursementDescription(@PathVariable int reimId, @RequestBody String desc, HttpSession session) {

        try {
            return ResponseEntity.accepted().body(reimServ.updateDescription(reimId, desc, (int) session.getAttribute("userId")));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }


}
