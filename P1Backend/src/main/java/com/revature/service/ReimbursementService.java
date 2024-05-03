package com.revature.service;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.BadAttributeValueExpException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    ReimbursementDAO reimDAO;
    UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimDAO, UserDAO userDAO) {
        this.reimDAO=reimDAO;
        this.userDAO=userDAO;
    }

    public Reimbursement createReimbursement(ReimbursementDTO reimDTO, int userId) {
        validateDesc(reimDTO.getDescription());
        validateAmt(reimDTO.getAmount());
        Optional<User> user = userDAO.findById(userId);
        if (user.isEmpty())
            throw new IllegalArgumentException("No user with Id: " + userId);
        Reimbursement reimbursement = new Reimbursement(
                reimDTO.getDescription(), reimDTO.getAmount(), 0, user.get());

        return reimDAO.save(reimbursement);
    }



    public List<Reimbursement> getAllReims(int userId) {
        Optional<User> user = userDAO.findById(userId);
        List<Reimbursement> rb = reimDAO.findAll();
        if (user.isPresent() && user.get().getRole().equals("MANAGER"))
            return rb;
        else if (user.isPresent() && user.get().getRole().equals("USER")) {
            final int ID=user.get().getUserId();
            return rb.stream().filter((reim)-> reim.getUser().getUserId()==ID).toList();
        }
        return new ArrayList<>();
    }

    public List<Reimbursement> getAllPending(int userId) {
        List<Reimbursement> allPending = reimDAO.findByStatus(0);
        Optional<User> user = userDAO.findById(userId);
        if (user.isPresent() && user.get().getRole().equals("MANAGER"))
            return allPending;
        else if (user.isPresent() && user.get().getRole().equals("USER")) {
            return allPending.stream()
                    .filter((r)->r.getUser().getUserId()==user.get().getUserId()).toList();
        }

        return new ArrayList<>();
    }


    public Object updateStatus(int reimId, int status) throws IllegalAccessException {
        validateReimbursement(reimId);
        validateStatus(status);

        Reimbursement reimbursement = reimDAO.findById(reimId).get();
        reimbursement.setStatus(status);
        return reimDAO.save(reimbursement);
    }


    public Object updateDescription(int reimId, String desc, int userId) throws IllegalAccessException, BadAttributeValueExpException {

        validateReimbursement(reimId);
        validateDesc(desc);
        Reimbursement reimbursement = reimDAO.findById(reimId).get();

        validateUser(reimbursement, userId);
        reimbursement.setDescription(desc);

        return reimDAO.save(reimbursement);
    }

    ////////////////// ERROR HANDLING METHODS /////////////////////

    private void validateReimbursement(int reimId) throws IllegalAccessException {
        Optional<Reimbursement> rb = reimDAO.findById(reimId);
        if (rb.isEmpty())
            throw new IllegalArgumentException("No Reimbursement with Id: " + reimId +" found");
    }

    private void validateAmt(double amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("Invalid Amount");
    }

    private void validateDesc(String description) {
        if (description.length() > 100)
            throw new IllegalArgumentException("Description is too long");
        if (description.isBlank())
            throw new IllegalArgumentException("Please provide a description");
    }

    private void validateStatus(int status) {
        if (status < 0 || status >2)
            throw new IllegalArgumentException("Invalid Status");
    }

    private void validateUser(Reimbursement reimbursement, int userId) throws BadAttributeValueExpException {
        if (reimbursement.getUser().getUserId() != userId)
            throw new BadAttributeValueExpException("This reimbursement does not belong to you.");
    }


}
