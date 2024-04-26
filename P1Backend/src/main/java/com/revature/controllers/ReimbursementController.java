package com.revature.controllers;

import com.revature.service.ReimbursementService;
import com.revature.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reimbursements")
public class ReimbursementController {

    ReimbursementService reimServ;
    UserService userServ;

    public ReimbursementController() {
        reimServ = new ReimbursementService();
        userServ = new UserService();
    }


}
