package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReimbursementDAO extends JpaRepository<Reimbursement,Integer> {
    //List<Reimbursement> findAllByUserUserId(int userId);

    List<Reimbursement> findByStatus(int i);
}
