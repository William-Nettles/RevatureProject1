package com.revature.service;

import com.revature.daos.ReimbursementDAO;
import org.springframework.beans.factory.annotation.Autowired;

public class ReimbursementService {

    ReimbursementDAO reimDAO;

    @Autowired
    public ReimbursementService() {

    }
}
