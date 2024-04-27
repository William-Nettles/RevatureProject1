package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.service.ReimbursementService;
import com.revature.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
public class ReimbursementController {

    ReimbursementService reimServ;
    UserService userServ;

    public ReimbursementController() {
        reimServ = new ReimbursementService();
        userServ = new UserService();
    }

    @PostMapping
    public ResponseEntity<Object> createNewReimbursement(@RequestBody Reimbursement reimbursement) {
        return reimServ.createReimbursement(reimbursement);
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return reimServ.getAllReims();
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getPendingReimbursements() {
        return reimServ.getAllPending();
    }

    @PatchMapping("/{reimId}")
    public ResponseEntity<Object> updateReimbursementStatus(@PathVariable int reimId, @RequestBody int status) {
        return reimServ.updateStatus(reimId, status);
    }


}
