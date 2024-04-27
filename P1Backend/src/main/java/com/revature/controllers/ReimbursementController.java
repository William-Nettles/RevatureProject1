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

    @GetMapping("/{userID}")
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(@PathVariable int userId) {
        return reimServ.getAllReims(userId);
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
    public  ResponseEntity<Object> uppdateReimbursementDescription(@PathVariable int reimId, @RequestBody String desc) {
        return reimServ.updateDescription(reimId, desc);
    }


}
