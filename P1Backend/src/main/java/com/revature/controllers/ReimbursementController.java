package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.service.ReimbursementService;
import com.revature.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin
public class ReimbursementController {

    ReimbursementService reimServ;

    @Autowired
    public ReimbursementController(ReimbursementService reimServ) { this.reimServ = reimServ;}

    @PostMapping("/{userId}")
    public ResponseEntity<Object> createNewReimbursement(@RequestBody Reimbursement reimbursement, @PathVariable int userId) {
        return reimServ.createReimbursement(reimbursement, userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(@PathVariable int id) {
        return reimServ.getAllReims(id);
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<List<Reimbursement>> getPendingReimbursements(@PathVariable int userId) {
        return reimServ.getAllPending(userId);
    }

    @PatchMapping("/{reimId}")
    public ResponseEntity<Object> updateReimbursementStatus(@PathVariable int reimId, @RequestBody int status) {
        return reimServ.updateStatus(reimId, status);
    }

    @PutMapping("/{reimId}")
    public  ResponseEntity<Object> updateReimbursementDescription(@PathVariable int reimId, @RequestBody String desc) {
        return reimServ.updateDescription(reimId, desc);
    }


}
